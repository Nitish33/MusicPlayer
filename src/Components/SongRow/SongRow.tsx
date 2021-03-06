import React, {useEffect, useRef} from 'react';
import {View, Text, Animated, TouchableOpacity, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import SongModal from '../../Modals/SongModal';
import Styles from './styles';
import R from '../../Utils/R';

export interface ISongRowProps {
  song: SongModal;
  index: number;
  isSelected: boolean;
  onSongSelected: (song: SongModal, index: number) => void;
}

export default function SongRow(props: ISongRowProps) {
  const {song, isSelected, onSongSelected, index} = props;

  return (
    <TouchableOpacity
      style={Styles.containerStyle}
      onPress={() => {
        onSongSelected?.(song, index);
      }}>
      {isSelected && (
        <View
          style={{
            position: 'absolute',
            width: 20,
            left: 10,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={R.Images.Play} style={{width: 8, height: 8}} />
        </View>
      )}

      <View style={Styles.textContainerStyle}>
        <Text style={Styles.textStyle}>{song?.name}</Text>
        <Text style={Styles.artistNameStyle}>{song?.artistName}</Text>
      </View>

      {isSelected && (
        <LottieView
          source={R.Animations.PlayingMusicAnimation}
          style={{
            width: 45,
            // height: 45,
            // height: 20,
            transform: [{scaleX: 1.5}, {scaleY: 1.5}],
          }}
          autoPlay
          loop
        />
      )}
    </TouchableOpacity>
  );
}
