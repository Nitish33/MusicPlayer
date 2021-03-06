import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Animated, Image, TouchableOpacity} from 'react-native';
import PlayerManager from '../../Manager/PlayerManager';
import {
  registerEventListener,
  removeListener,
} from '../../EventEmitter/EventEmitter';
import {PlayerEvent} from '../../Utils/Enums';
import R from '../../Utils/R';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

export interface IBottomMiniPlayerProps {
  navigateToPlayer: () => void;
}

export default function BottomMiniPlayer(props: IBottomMiniPlayerProps) {
  const {navigateToPlayer} = props;

  const [selectedSong, updateSelectedSong] = useState({
    current: PlayerManager.getManagerInstance().currentSong,
  });

  const [playing, updatingPlaying] = useState({
    current: PlayerManager.getManagerInstance().isPlaying,
  });

  const animation = useRef<Animated.Value>(
    new Animated.Value(selectedSong.current === null ? 0 : 1),
  );

  const onSongChanged = (data: any) => {
    updateSelectedSong({current: data.song});

    Animated.timing(animation.current, {
      toValue: 1,
      duration: R.Constants.AnimationDuration,
      useNativeDriver: true,
    }).start();
  };

  const updatePlayState = (state: any) => {
    updatingPlaying({current: state.songPlaying});
  };

  useEffect(() => {
    registerEventListener(onSongChanged, PlayerEvent.SONG_CHANGED);
    registerEventListener(updatePlayState, PlayerEvent.MUSIC_PLAY);
    registerEventListener(updatingPlaying, PlayerEvent.MUSIC_STOP);

    return () => {
      removeListener(onSongChanged, PlayerEvent.SONG_CHANGED);
      removeListener(updatePlayState, PlayerEvent.MUSIC_PLAY);
      removeListener(updatingPlaying, PlayerEvent.MUSIC_STOP);
    };
  }, []);

  const containerAnimatedStyle = () => {
    const translationInterpolation = animation.current.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 0],
    });

    return {
      transform: [{translateY: translationInterpolation}],
      width: '100%',
      height: 80,
      backgroundColor: R.Colors.PrimaryDark,
      position: 'absolute',
      bottom: 0,
      paddingHorizontal: 20,
      paddingTop: 15,
      paddingBottom: 10,
      flexDirection: 'row',
    };
  };

  return (
    <AnimatedTouchableOpacity
      activeOpacity={1}
      style={containerAnimatedStyle()}
      onPress={navigateToPlayer}>
      <Image
        source={{uri: selectedSong?.current?.getArtWorkImageWithSize(50, 50)}}
        style={{width: 40, height: 40, backgroundColor: 'red', borderRadius: 5}}
      />

      <View style={{paddingHorizontal: 10, flex: 1}}>
        <Text style={{color: 'white', fontSize: 16}}>
          {selectedSong?.current?.name}
        </Text>
        <Text style={{color: 'white', fontSize: 12, marginTop: 2}}>
          {selectedSong?.current?.artistName}
        </Text>
      </View>

      <TouchableOpacity
        onPress={
          playing.current
            ? PlayerManager.getManagerInstance().pauseSong
            : PlayerManager.getManagerInstance().playSong
        }>
        <Image
          source={playing.current ? R.Images.Pause : R.Images.Play}
          style={{
            width: 16,
            height: 16,
            resizeMode: 'contain',
            tintColor: 'white',
            marginTop: 10,
            marginRight: 10,
          }}
        />
      </TouchableOpacity>
    </AnimatedTouchableOpacity>
  );
}
