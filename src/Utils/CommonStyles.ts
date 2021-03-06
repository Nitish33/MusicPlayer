import {StyleSheet} from 'react-native';
import * as Dimension from './Dimension';

const CommonStyles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },

  screenContainerStyle: {
    flex: 1,
    padding: Dimension.Padding.medium,
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommonStyles;
