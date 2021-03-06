import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {NavigationType} from '../../Navigation/NavigationType';

export type Navigation = StackNavigationProp<NavigationType, 'Splash'>;
export type Route = RouteProp<NavigationType, 'Splash'>;
