import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Animated, TouchableOpacity, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import SongModal from '../../Modals/SongModal';
import Styles from './styles';
import R from '../../Utils/R';
import PlayerManager from '../../Manager/PlayerManager';
import {
  registerEventListener,
  removeListener,
} from '../../EventEmitter/EventEmitter';
import {PlayerEvent} from '../../Utils/Enums';

export interface ISongRowProps {
  song: SongModal;
  index: number;
  isSelected: boolean;
  onSongSelected: (song: SongModal, index: number) => void;
}

export default function SongRow(props: ISongRowProps) {
  const {song, isSelected, onSongSelected, index} = props;

  const [playing, updatePlaying] = useState({
    current: PlayerManager.getManagerInstance().isPlaying,
  });

  const updatePlayState = (state: any) => {
    updatePlaying({current: state.songPlaying});
  };

  useEffect(() => {
    registerEventListener(updatePlayState, PlayerEvent.MUSIC_PLAY);
    registerEventListener(updatePlayState, PlayerEvent.MUSIC_STOP);

    return () => {
      removeListener(updatePlayState, PlayerEvent.MUSIC_STOP);
      removeListener(updatePlayState, PlayerEvent.MUSIC_PLAY);
    };
  }, []);

  return (
    <TouchableOpacity
      style={Styles.containerStyle}
      onPress={() => {
        onSongSelected?.(song, index);
      }}>
      {isSelected && (
        <TouchableOpacity
          style={Styles.buttonContainer}
          onPress={() => {
            if (playing.current) {
              PlayerManager.getManagerInstance().pauseSong();
            } else {
              PlayerManager.getManagerInstance().playSong();
            }
          }}>
          <Image
            source={playing.current ? R.Images.Pause : R.Images.Play}
            style={Styles.logoStyle}
          />
        </TouchableOpacity>
      )}

      <View style={Styles.textContainerStyle}>
        <Text style={Styles.textStyle}>{song?.name}</Text>
        <Text style={Styles.artistNameStyle}>{song?.artistName}</Text>
      </View>

      {isSelected && playing.current && (
        <LottieView
          source={R.Animations.PlayingMusicAnimation}
          style={Styles.animationStyle}
          autoPlay
          loop
        />
      )}
    </TouchableOpacity>
  );
}
