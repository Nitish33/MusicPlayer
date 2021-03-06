import React, {Component} from 'react';
import {
  Animated,
  Image,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import SongRow from '../../Components/SongRow/SongRow';
import {registerEventListener} from '../../EventEmitter/EventEmitter';
import SongModal from '../../Modals/SongModal';
import {PlayerEvent} from '../../Utils/Enums';
import R from '../../Utils/R';
import {Navigation, Route} from './NavigationType';
import Styles from './styles';

const {ExpandHeaderHeight, CollapsedHeaderHeight} = R.Dimensions;

export interface IHomeScreenProps {
  navigation: Navigation;
  route: Route;
}

export interface IHomeScreenState {
  loading: boolean;
  data: Array<SongModal>;
  selectedSong?: SongModal;
}

export default class HomeScreen extends Component<
  IHomeScreenProps,
  IHomeScreenState
> {
  scrollY: Animated.Value;

  constructor(props: IHomeScreenProps) {
    super(props);

    this.state = {
      loading: true,
      data: [],
    };

    this.scrollY = new Animated.Value(0);

    this.fetchData();

    registerEventListener(this.onSongChangedListener, PlayerEvent.SONG_CHANGED);
    registerEventListener(this.onPlayerStateChanged, PlayerEvent.MUSIC_PLAY);
    registerEventListener(this.onPlayerStateChanged, PlayerEvent.MUSIC_STOP);
  }

  fetchData = () => {
    fetch(`${R.Constants.Base_Url}/search?term=Punjabi`)
      .then((response) => response.json())
      .then((data) => {
        const {results} = data;

        const songs = results?.map((song: any) => {
          return new SongModal(song);
        });

        this.setState({
          data: songs,
          selectedSong: songs[0],
        });
      })
      .catch((error) => {
        console.log('error is', error);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  headerAnimatedStyle = () => {
    const translationInterpolation = this.scrollY.interpolate({
      inputRange: [
        -1,
        0,
        ExpandHeaderHeight - CollapsedHeaderHeight,
        ExpandHeaderHeight - CollapsedHeaderHeight + 1,
      ],
      outputRange: [-1, 0, 0, 1],
    });

    // transform: [{translateY: 50}]

    return {
      ...Styles.listHeaderStyle,
      zIndex: 100,
      transform: [{translateY: translationInterpolation}],
    };
  };

  headerContainerAnimatedStyle = () => {
    const translationInterpolation = this.scrollY.interpolate({
      inputRange: [
        -1,
        0,
        ExpandHeaderHeight - CollapsedHeaderHeight,
        ExpandHeaderHeight - CollapsedHeaderHeight + 1,
      ],
      outputRange: [
        0,
        0,
        ExpandHeaderHeight - CollapsedHeaderHeight,
        ExpandHeaderHeight - CollapsedHeaderHeight,
      ],
    });

    return [
      StyleSheet.absoluteFill,
      {transform: [{translateY: translationInterpolation}]},
    ];
  };

  headerBackgroundImageStyle = () => {
    const opacityInterpolation = this.scrollY.interpolate({
      inputRange: [0, ExpandHeaderHeight - CollapsedHeaderHeight],
      outputRange: [1, 0],
    });

    return {
      width: '100%',
      height: '100%',
      position: 'absolute',
      opacity: opacityInterpolation,
    };
  };

  headerTitleAnimatedStyle = (): Animated.AnimatedProps<ViewStyle> => {
    const scaleInterpolation = this.scrollY.interpolate({
      inputRange: [0, ExpandHeaderHeight - CollapsedHeaderHeight],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });

    const bottomPositionInterpolatin = this.scrollY.interpolate({
      inputRange: [
        -1,
        0,
        ExpandHeaderHeight - CollapsedHeaderHeight,
        ExpandHeaderHeight - CollapsedHeaderHeight + 1,
      ],
      outputRange: [
        10,
        10,
        -(ExpandHeaderHeight - CollapsedHeaderHeight) + 40,
        -(ExpandHeaderHeight - CollapsedHeaderHeight) + 40,
      ],
    });

    return {
      color: 'white',
      position: 'absolute',
      fontSize: 25,
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      bottom: 50,
      left: 15,
      transform: [{translateY: bottomPositionInterpolatin}],
      //   fontSize: fontSizeInterpolation,
    };
  };

  renderListHeader = () => {
    const {selectedSong} = this.state;

    const animatedHeaderStyle = this.headerAnimatedStyle();
    const headerContainerAnimatedStyle = this.headerContainerAnimatedStyle();
    const headerBackgroundImageStyle = this.headerBackgroundImageStyle();
    const headerTitleAnimatedStyle = this.headerTitleAnimatedStyle();

    return (
      <Animated.View style={animatedHeaderStyle} pointerEvents="none">
        <Animated.View style={headerContainerAnimatedStyle}>
          <Animated.Image
            style={headerBackgroundImageStyle}
            source={{
              uri: selectedSong?.getArtWorkImageWithSize(600, 600),
            }}
            resizeMode="cover"
          />

          <LinearGradient
            colors={['#0000', '#000000FF']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={StyleSheet.absoluteFill}
          />

          <Animated.Text style={headerTitleAnimatedStyle} numberOfLines={2}>
            {selectedSong?.name}
          </Animated.Text>

          <Animated.Text style={headerTitleAnimatedStyle} numberOfLines={2}>
            {selectedSong?.artistName}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    );
  };

  onSongSelected = (song: SongModal, index: number) => {
    this.setState(
      {
        selectedSong: song,
      },
      () => {
        this.navigateToPlayerScreen(index);
      },
    );
  };

  renderItems = (data: ListRenderItemInfo<SongModal>) => {
    const {item, index} = data;
    const {selectedSong} = this.state;

    return (
      <SongRow
        index={index}
        song={item}
        isSelected={selectedSong?.id === item?.id}
        onSongSelected={this.onSongSelected}
      />
    );
  };

  navigateToPlayerScreen = (index: number) => {
    const {navigation} = this.props;
    const {selectedSong, data} = this.state;

    navigation.navigate('Player', {
      songs: data,
      selectedSong: selectedSong,
      selectedIndex: index,
    });
  };

  onSongChangedListener = (song: SongModal) => {
    console.log('Changed new song', song);
  };

  onPlayerStateChanged = (state) => {
    console.log('player state is', state);
  };

  render() {
    const {data, loading, selectedSong} = this.state;

    return (
      <ScreenContainer loading={loading}>
        <Animated.FlatList
          ListHeaderComponent={this.renderListHeader}
          ListHeaderComponentStyle={{zIndex: 1000}}
          data={data}
          renderItem={this.renderItems}
          keyExtractor={(item) => {
            return `${item?.id}`;
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.scrollY}}}],
            {useNativeDriver: true},
          )}
        />
      </ScreenContainer>
    );
  }
}
