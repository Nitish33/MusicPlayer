import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  imageStyle: {
    width: 20,
    height: 20,
    tintColor: 'white',
    resizeMode: 'contain',
  },

  playContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: 'red',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});

export default styles;
