import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    height: 46,
    paddingLeft: 30,
    paddingRight: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },

  textContainerStyle: {
    flex: 1,
  },

  textStyle: {
    color: 'white',
    fontWeight: '500',
  },

  artistNameStyle: {
    fontSize: 10,
    color: 'rgb(231,242,243)',
  },

  buttonContainer: {
    position: 'absolute',
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoStyle: {
    width: 8,
    tintColor: 'white',
    height: 8,
  },

  animationStyle: {
    width: 45,
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
});

export default styles;
