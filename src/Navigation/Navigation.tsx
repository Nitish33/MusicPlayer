import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationType} from './NavigationType';
import Splash from '../Screens/Splash/Splash';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import PlayerScreen from '../Screens/PlayerScreen/PlayerScreen';

const StackCreator = createStackNavigator<NavigationType>();

const AppStack = () => {
  return (
    <StackCreator.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <StackCreator.Screen name="Splash" component={Splash} />

      <StackCreator.Screen name="Home" component={HomeScreen} />

      <StackCreator.Screen name="Player" component={PlayerScreen} />
    </StackCreator.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default RootNavigator;
