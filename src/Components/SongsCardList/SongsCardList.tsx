import React from 'react';
import {View, Text, FlatList, ListRenderItemInfo} from 'react-native';
import SongModal from '../../Modals/SongModal';
import R from '../../Utils/R';
import LogoWithBackground from '../LogoWithBackground/LogoWithBackground';
import Styles from './styles';

export interface ISongCardListProps {
  songs: Array<SongModal>;
  initialIndex?: number;
  onSongChange?: (song: SongModal, index: number) => void;
}

export default function SongsCardList(props: ISongCardListProps) {
  const {songs, initialIndex = 0, onSongChange} = props;

  const renderItems = (data: ListRenderItemInfo<SongModal>) => {
    const {item} = data;

    return (
      <View style={{width: R.Dimensions.ScreenWidth}}>
        <LogoWithBackground song={item} containerStyle={{marginTop: -120}} />

        <Text style={Styles.songNameStyle} numberOfLines={1}>
          {item?.name}
        </Text>
        <Text style={Styles.artistNameStyle} numberOfLines={1}>
          {item?.artistName}
        </Text>
      </View>
    );
  };

  const onMomentumScrollEnd = ({nativeEvent: {contentOffset}}) => {
    const index = Math.floor(contentOffset.x / R.Dimensions.ScreenWidth);
    onSongChange?.(songs[index], index);
  };

  return (
    <FlatList
      initialScrollIndex={initialIndex}
      horizontal={true}
      data={songs}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      style={Styles.listStyle}
      renderItem={renderItems}
      onMomentumScrollEnd={onMomentumScrollEnd}
      getItemLayout={(_, index) => ({
        length: R.Dimensions.ScreenWidth,
        offset: R.Dimensions.ScreenWidth * index,
        index,
      })}
    />
  );
}
