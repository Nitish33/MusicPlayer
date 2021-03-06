import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationType} from '../../Navigation/NavigationType';

export type Navigation = StackNavigationProp<NavigationType, 'Player'>;
export type Route = RouteProp<NavigationType, 'Player'>;
