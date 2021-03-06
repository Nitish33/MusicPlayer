import {
  emitSongChangedEvent,
  emitSongPlayed,
  emitTimerUpdated,
} from '../EventEmitter/EventEmitter';
import SongModal from '../Modals/SongModal';

class PlayerManager {
  static player: PlayerManager | null = null;

  songs: Array<SongModal> = [];
  currentSong: SongModal | null = null;
  currentSongIndex: number = 0;
  currentDuration: 0;
  interval: any = null;

  getManagerInstance = () => {
    if (PlayerManager.player === null) {
      PlayerManager.player = new PlayerManager();
    }

    return PlayerManager.player;
  };

  playNext = () => {
    if (this.currentSongIndex === this.songs.length - 1) {
      this.currentSongIndex = 0;
      this.currentSong = this.songs[0];
    } else {
      this.currentSongIndex += 1;
      this.currentSong = this.songs[this.currentSongIndex + 1];
    }

    this.currentDuration = 0;
    emitSongChangedEvent(this.currentSong, this.currentSongIndex);
    emitTimerUpdated(this.currentDuration, this.currentSong.getTimeInSeconds());
    emitSongPlayed();
  };

  playPrevious = () => {
    if (this.currentSongIndex === 0) {
      this.currentSongIndex = this.songs.length - 1;
      this.currentSong = this.songs[this.currentSongIndex];
    } else {
      this.currentSongIndex -= 1;
      this.currentSong = this.songs[this.currentSongIndex + 1];
    }

    this.currentDuration = 0;
    emitSongChangedEvent(this.currentSong, this.currentSongIndex);
    emitTimerUpdated(this.currentDuration, this.currentSong.getTimeInSeconds());
    emitSongPlayed();
  };

  playSelectedSong = (song: SongModal, index: number) => {
    if (index >= this.songs.length || index < 0) {
      return;
    }

    this.currentSong = song;
    this.currentSongIndex = index;

    emitSongChangedEvent(this.currentSong, this.currentSongIndex);
    emitTimerUpdated(this.currentDuration, this.currentSong.getTimeInSeconds());
    emitSongPlayed();
  };
}

export default PlayerManager;
