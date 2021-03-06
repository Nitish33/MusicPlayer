import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  registerEventListener,
  removeListener,
} from '../../../../EventEmitter/EventEmitter';
import PlayerManager from '../../../../Manager/PlayerManager';
import {PlayerEvent} from '../../../../Utils/Enums';
import R from '../../../../Utils/R';
import Styles from './styles';

export interface IButtonPanelProps {
  containerStyle?: ViewStyle;
}

export default function ButtonPanel(props: IButtonPanelProps) {
  const {containerStyle} = props;

  const [isPlaying, updatePlaying] = useState({
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[Styles.containerStyle, containerStyle]}>
      <TouchableOpacity
        onPress={() => {
          PlayerManager.getManagerInstance().playPrevious();
        }}>
        <Image source={R.Images.Previous} style={Styles.imageStyle} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (isPlaying.current) {
            PlayerManager.getManagerInstance().pauseSong();
          } else {
            PlayerManager.getManagerInstance().playSong();
          }
        }}>
        <LinearGradient
          colors={[R.Colors.PrimaryLight, R.Colors.PrimaryDark]}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          style={Styles.playContainer}>
          <Image
            source={
              isPlaying.current === false ? R.Images.Play : R.Images.Pause
            }
            style={Styles.imageStyle}
          />
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          PlayerManager.getManagerInstance().playNext();
        }}>
        <Image source={R.Images.Next} style={Styles.imageStyle} />
      </TouchableOpacity>
    </View>
  );
}
