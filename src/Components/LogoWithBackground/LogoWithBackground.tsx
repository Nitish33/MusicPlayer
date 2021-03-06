import React from 'react';
import {View, Image, ViewStyle} from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import SongModal from '../../Modals/SongModal';
import Styles from './styles';

export interface ILogoWithBackgroundProps {
  song: SongModal;
  containerStyle?: ViewStyle;
}

export default function LogoWithBackground(props: ILogoWithBackgroundProps) {
  const {song, containerStyle} = props;

  return (
    <View style={[Styles.logoContainerStyle, containerStyle]}>
      <View style={Styles.borderOverlayStyle} />

      <Image
        style={Styles.logoStyle}
        source={{uri: song?.getArtWorkImageWithSize(200, 200)}}
      />

      <RadialGradient
        style={Styles.radialGradientStyle}
        colors={['transparent', '#303030']}
        stops={[0.4, 1]}
        center={[125, 125]}
        radius={200}
      />
    </View>
  );
}
