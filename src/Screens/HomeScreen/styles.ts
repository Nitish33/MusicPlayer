import {StyleSheet} from 'react-native';
import R from '../../Utils/R';

const styles = StyleSheet.create({
  listHeaderStyle: {
    height: R.Dimensions.ExpandHeaderHeight,
    overflow: 'hidden',
    backgroundColor: R.Colors.PrimaryLight,
    zIndex: -10,
  },
});

export default styles;
