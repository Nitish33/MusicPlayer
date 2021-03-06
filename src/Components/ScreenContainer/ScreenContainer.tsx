import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import LottieView from 'lottie-react-native';
import Styles from './styles';
import R from '../../Utils/R';
import LinearGradient from 'react-native-linear-gradient';

export interface IScreenContainerProps {
  children: any;
  loading?: boolean;
}

export default function ScreenContainer(props: IScreenContainerProps) {
  const {children, loading} = props;

  return (
    <LinearGradient
      colors={[R.Colors.PrimaryLight, R.Colors.PrimaryDark]}
      style={Styles.containerStyle}>
      {children}
      {loading && (
        <View style={Styles.loaderStyle}>
          <LottieView
            source={R.Animations.LoaderAnimation}
            loop
            autoPlay
            style={Styles.lottieViewStyle}
          />
        </View>
      )}
    </LinearGradient>
  );
}
