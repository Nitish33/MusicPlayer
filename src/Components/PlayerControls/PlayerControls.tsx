import React from 'react';
import {View, Text} from 'react-native';
import ButtonPanel from './components/ButtonPanel/ButtonPanel';
import RepeatPanel from './components/RepeatPanel/RepeatPanel';
import SeekBar from './components/SeekBar/SeekBar';

export default function PlayerControls() {
  return (
    <View>
      <SeekBar />

      <RepeatPanel containerStyle={{marginTop: 10}} />
      <ButtonPanel containerStyle={{marginTop: 30}} />
    </View>
  );
}
