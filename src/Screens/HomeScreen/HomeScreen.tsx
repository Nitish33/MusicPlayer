import React, {Component} from 'react';
import {
  Animated,
  Image,
  LayoutAnimation,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BottomMiniPlayer from '../../Components/BottomMiniPlayer/BottomMiniPlayer';
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import SongRow from '../../Components/SongRow/SongRow';
import {registerEventListener} from '../../EventEmitter/EventEmitter';
import PlayerManager from '../../Manager/PlayerManager';
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
  selectedIndex?: number;
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
  }

  fetchData = () => {
    fetch(`${R.Constants.Base_Url}/search?term=Michael+jackson`)
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

        PlayerManager.getManagerInstance().addMusics(songs);
      })
      .catch((error) => {})
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
      bottom: 60,
      left: 15,
      right: 15,
      transform: [{translateY: bottomPositionInterpolatin}],
      //   fontSize: fontSizeInterpolation,
    };
  };

  renderListHeader = () => {
    const {selectedSong} = this.state;

    if (!selectedSong) {
      return <View style={{marginTop: 50}} />;
    }

    const animatedHeaderStyle = this.headerAnimatedStyle();
    const headerContainerAnimatedStyle = this.headerContainerAnimatedStyle();
    const headerBackgroundImageStyle = this.headerBackgroundImageStyle();
    const headerTitleAnimatedStyle = this.headerTitleAnimatedStyle();

    return (
      <Animated.View
        style={animatedHeaderStyle}
        pointerEvents="none"
        collapsable={false}>
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

          <Animated.Text style={headerTitleAnimatedStyle} numberOfLines={1}>
            {selectedSong?.name}
          </Animated.Text>

          <Animated.Text
            style={[headerTitleAnimatedStyle, {bottom: 45, fontSize: 12}]}
            numberOfLines={1}>
            {selectedSong?.artistName}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    );
  };

  onSongSelected = (song: SongModal, index: number) => {
    PlayerManager.getManagerInstance().playSelectedSong(song, index);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

    this.setState({
      selectedSong: song,
      selectedIndex: index,
    });
  };

  renderItems = (data: ListRenderItemInfo<SongModal>) => {
    const {item, index} = data;
    const {selectedSong} = this.state;

    return (
      <SongRow
        index={index}
        song={item}
        isSelected={selectedSong?.id === item?.id && selectedSong?.id}
        onSongSelected={this.onSongSelected}
      />
    );
  };

  navigateToPlayerScreen = () => {
    const {navigation} = this.props;
    navigation.navigate('Player');
  };

  onSongChangedListener = (data: any) => {
    const {song, index} = data;

    this.setState({
      selectedSong: song,
      selectedIndex: index,
    });
  };

  render() {
    const {data, loading} = this.state;

    return (
      <ScreenContainer loading={loading}>
        <Animated.FlatList
          // This is to prevent header item from disappering when flatlist is scrolled
          removeClippedSubviews={false}
          contentContainerStyle={{paddingBottom: 80}}
          ListHeaderComponent={this.renderListHeader}
          ListHeaderComponentStyle={{zIndex: 100}}
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

        <BottomMiniPlayer navigateToPlayer={this.navigateToPlayerScreen} />
      </ScreenContainer>
    );
  }
}
