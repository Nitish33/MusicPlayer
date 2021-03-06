import SongModal from '../Modals/SongModal';

export type NavigationType = {
  Splash: undefined;
  Home: undefined;
  Player: {
    songs: Array<SongModal>;
    selectedSong: SongModal;
    selectedIndex: number;
  };
};
