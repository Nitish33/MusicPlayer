import {StyleSheet} from 'react-native';
import R from '../../Utils/R';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },

  loaderStyle: {
    ...StyleSheet.absoluteFill,
    ...R.CommonStyles.centerContent,
  },

  lottieViewStyle: {
    width: 75,
    height: 75,
  },
});

export default styles;
