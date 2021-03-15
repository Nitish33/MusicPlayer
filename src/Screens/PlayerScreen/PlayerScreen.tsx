import React, {Component} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import LogoWithBackground from '../../Components/LogoWithBackground/LogoWithBackground';
import PlayerControls from '../../Components/PlayerControls/PlayerControls';
import SongsCardList from '../../Components/SongsCardList/SongsCardList';
import {emitSongChangedEvent} from '../../EventEmitter/EventEmitter';
import PlayerManager from '../../Manager/PlayerManager';
import SongModal from '../../Modals/SongModal';
import R from '../../Utils/R';
import {Navigation, Route} from './NavigationType';
import Styles from './styles';

export interface IPlayerScreenProps {
  navigation: Navigation;
  route: Route;
}

export interface IPlayerScreenState {}

class PlayerScreen extends Component<IPlayerScreenProps, IPlayerScreenState> {
  render() {
    const songs = PlayerManager.getManagerInstance().songs;

    const onSongChanged = (song: SongModal, index: number) => {
      PlayerManager.getManagerInstance().playSelectedSong(song, index);
    };

    return (
      <View style={R.CommonStyles.containerStyle}>
        {/* <Image
          style={Styles.backgroundImageStyle}
          blurRadius={15}
          source={{
            uri: route.params.selectedSong?.getArtWorkImageWithSize(600, 800),
          }}
        /> */}

        <View style={Styles.backgroundImageOverlayStyle} />

        <LinearGradient
          colors={[
            R.Colors.PrimaryLight,
            R.Colors.PrimaryColor,
            R.Colors.PrimaryDark,
          ]}
          style={Styles.containerStyle}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        />

        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{
              paddingTop: 50,
            }}
            showsVerticalScrollIndicator={false}>
            <SongsCardList songs={songs} onSongChange={onSongChanged} />

            <View
              style={{
                paddingHorizontal: 2 * R.Dimensions.Padding.medium,
                marginTop: 30,
              }}>
              <PlayerControls />

              <Text style={Styles.artistTextStyle}>Artist</Text>
              <Text style={Styles.artistDescriptionTextStyle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem accusantium iste iure maxime nesciunt, nemo
                soluta quis architecto, quo dicta quasi doloremque nihil in
                repudiandae vel vitae fuga temporibus itaque. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Labore saepe nisi porro
                corporis ut esse reiciendis fuga provident, mollitia accusamus
                alias voluptatem deleniti dolor possimus harum ipsam modi.
                Minima, porro!
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

PlayerScreen.sharedElements = () => {
  const songs = PlayerManager.getManagerInstance().songs;

  return songs?.map((song) => {
    return `${song?.id}`;
  });
};

export default PlayerScreen;
