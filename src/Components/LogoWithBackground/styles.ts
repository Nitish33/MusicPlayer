import {StyleSheet} from 'react-native';

const ImageSize = 250;

const styles = StyleSheet.create({
  logoContainerStyle: {
    alignItems: 'center',
    zIndex: 10,
    height: ImageSize,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },

  borderOverlayStyle: {
    position: 'absolute',
    backgroundColor: 'rgb(0, 133,134)',
    width: ImageSize + 3,
    height: ImageSize + 4,
    marginTop: -3.5,
    borderRadius: 30,
  },

  logoStyle: {
    width: ImageSize,
    height: ImageSize,
    position: 'absolute',
    borderRadius: 30,
    borderColor: 'rgb(0, 133,134)',
  },

  radialGradientStyle: {
    width: ImageSize,
    height: ImageSize,
    position: 'absolute',
    borderRadius: 30,
    overflow: 'hidden',
  },
});

export default styles;
