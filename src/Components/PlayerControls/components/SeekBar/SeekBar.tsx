import React, {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import Styles from './styles';
import {
  registerEventListener,
  removeListener,
} from '../../../../EventEmitter/EventEmitter';
import {PlayerEvent} from '../../../../Utils/Enums';
import R from '../../../../Utils/R';
import PlayerManager from '../../../../Manager/PlayerManager';

export default function SeekBar() {
  const [currentTime, setCurrentTime] = useState(0);
  const [displayTime, setDisplayTime] = useState(0);
  const [totalTime, setTotaltime] = useState(0);

  // To prevent capturing of variable, using ref
  const isUserInteractingWithSeekBar = useRef(false);

  const timerListener = (data: any) => {
    const {current, total} = data;
    setDisplayTime(current);

    if (isUserInteractingWithSeekBar.current) {
      return;
    }

    setCurrentTime(current);
    setTotaltime(total);
  };

  useEffect(() => {
    registerEventListener(timerListener, PlayerEvent.TIMER_UPDATED);

    return () => {
      removeListener(timerListener, PlayerEvent.TIMER_UPDATED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSlidingStart = () => {
    isUserInteractingWithSeekBar.current = true;
  };

  const onSlidingCompleted = (data) => {
    isUserInteractingWithSeekBar.current = false;
    PlayerManager.getManagerInstance().seekToDuration(Math.floor(data));
  };

  return (
    <View>
      <View style={Styles.timeContainerStyle}>
        <Text>{R.HelperFunctions.getTimeString(displayTime)}</Text>
        <Text>{R.HelperFunctions.getTimeString(totalTime)}</Text>
      </View>

      <Slider
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingCompleted}
        minimumValue={0}
        maximumValue={totalTime}
        value={currentTime}
        minimumTrackTintColor={'white'}
        maximumTrackTintColor={'#fff7'}
      />
    </View>
  );
}
