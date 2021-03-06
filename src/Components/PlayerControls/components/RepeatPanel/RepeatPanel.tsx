import React from 'react';
import {View, Text, TouchableOpacity, Image, ViewStyle} from 'react-native';
import R from '../../../../Utils/R';
import Styles from './styles';

export interface IRepeatPanelStyle {
  containerStyle?: ViewStyle;
}

export default function RepeatPanel(props: IRepeatPanelStyle) {
  const {containerStyle} = props;

  return (
    <View style={[Styles.containerStyle, containerStyle]}>
      <View style={Styles.buttonContainer}>
        <TouchableOpacity>
          <Image source={R.Images.Favourite} style={Styles.iconStyle} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={R.Images.Loop} style={Styles.iconStyle} />
        </TouchableOpacity>
      </View>

      <View style={Styles.buttonContainer}>
        <TouchableOpacity>
          <Image source={R.Images.Shuffle} style={Styles.iconStyle} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={R.Images.More} style={Styles.iconStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
