import React from 'react';
import {View, Text, TouchableOpacity, Image, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import R from '../../../../Utils/R';
import Styles from './styles';

export interface IButtonPanelProps {
  containerStyle?: ViewStyle;
}

export default function ButtonPanel(props: IButtonPanelProps) {
  const {containerStyle} = props;

  return (
    <View style={[Styles.containerStyle, containerStyle]}>
      <TouchableOpacity>
        <Image source={R.Images.Previous} style={Styles.imageStyle} />
      </TouchableOpacity>

      <TouchableOpacity>
        <LinearGradient
          colors={[R.Colors.PrimaryLight, R.Colors.PrimaryDark]}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          style={Styles.playContainer}>
          <Image source={R.Images.Play} style={Styles.imageStyle} />
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity>
        <Image source={R.Images.Pause} style={Styles.imageStyle} />
      </TouchableOpacity>
    </View>
  );
}
