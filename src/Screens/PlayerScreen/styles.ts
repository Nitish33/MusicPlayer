import {StyleSheet} from 'react-native';
import R from '../../Utils/R';

const styles = StyleSheet.create({
  backgroundImageStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  backgroundImageOverlayStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.5,
  },

  containerStyle: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    overflow: 'hidden',
    top: 150,
    left: 0,
    right: 0,
    bottom: 0,
  },

  artistTextStyle: {
    color: 'white',
    fontSize: 20,
    marginTop: 30,
    fontWeight: 'bold',
  },

  artistDescriptionTextStyle: {
    color: 'white',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 5,
    letterSpacing: 1,
    paddingBottom: 40,
  },
});

export default styles;
