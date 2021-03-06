import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import Styles from './styles';

export default function SeekBar() {
  return (
    <View>
      <View style={Styles.timeContainerStyle}>
        <Text>Start </Text>
        <Text>End </Text>
      </View>

      <Slider
        minimumValue={0}
        maximumValue={100}
        value={10}
        minimumTrackTintColor={'white'}
        maximumTrackTintColor={'#fff7'}
      />
    </View>
  );
}
