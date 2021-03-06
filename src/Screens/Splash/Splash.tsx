import {NavigationProp} from '@react-navigation/native';
import React, {Component} from 'react';
import {Platform, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import {Navigation, Route} from './NavigationType';
import R from '../../Utils/R';

export interface ISplashScreenProps {
  navigation: Navigation;
  route: Route;
}

export interface ISplashScreenState {}

export default class Splash extends Component<
  ISplashScreenProps,
  ISplashScreenState
> {
  constructor(props: ISplashScreenProps) {
    super(props);
  }

  navigateToHomeScreen = () => {
    const {navigation} = this.props;
    navigation.navigate('Home');
  };

  render() {
    return (
      <ScreenContainer>
        <View
          style={[
            R.CommonStyles.centerContent,
            R.CommonStyles.screenContainerStyle,
          ]}>
          <LottieView
            source={
              Platform.OS === 'android'
                ? R.Animations.TestAnimation
                : R.Animations.SplashAnimation
            }
            autoPlay
            loop={false}
            speed={0.5}
            onAnimationFinish={this.navigateToHomeScreen}
          />
        </View>
      </ScreenContainer>
    );
  }
}
