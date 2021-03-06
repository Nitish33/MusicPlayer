import {Dimensions} from 'react-native';

const {width: ScreenWidth, height: Screenheight} = Dimensions.get('window');

export {ScreenWidth, Screenheight};

export const Padding = {
  tiny: 2,
  extraSmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  extraLarge: 20,
};

export const BorderRadius = 4;
export const ButtonHeight = 40;
export const ExpandHeaderHeight = Screenheight / 2;
export const CollapsedHeaderHeight = 80;
