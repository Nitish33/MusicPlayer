import {
  emitSongChangedEvent,
  emitSongPaused,
  emitSongPlayed,
  emitTimerUpdated,
} from '../EventEmitter/EventEmitter';
import SongModal from '../Modals/SongModal';

class PlayerManager {
  static player: PlayerManager | null = null;

  songs: Array<SongModal> = [];
  currentSong: SongModal | null = null;
  currentSongIndex: number = 0;
  currentDuration: number = 0;
  interval: any = null;

  isPlaying: boolean = false;

  static getManagerInstance = () => {
    if (PlayerManager.player === null) {
      PlayerManager.player = new PlayerManager();
    }

    return PlayerManager.player;
  };

  addMusics = (array: Array<SongModal>) => {
    this.songs = [...this.songs, ...array];
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
    emitTimerUpdated(this.currentDuration, this.currentSong.trackTimeMillis);
    emitSongPlayed();

    this.playSong();
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
    emitTimerUpdated(this.currentDuration, this.currentSong.trackTimeMillis);
    emitSongPlayed();

    this.playSong();
  };

  playSelectedSong = (song: SongModal, index: number) => {
    if (index >= this.songs.length || index < 0) {
      return;
    }

    if (song?.id === this.currentSong?.id) {
      return;
    }

    this.currentSong = song;
    this.currentSongIndex = index;
    this.currentDuration = 0;
    emitSongChangedEvent(this.currentSong, this.currentSongIndex);
    emitTimerUpdated(this.currentDuration, this.currentSong.trackTimeMillis);
    emitSongPlayed();

    this.playSong();
  };

  startTimer = () => {
    this.stopTimer();

    this.interval = setInterval(() => {
      if (
        this.currentDuration >=
        Math.floor(this.currentSong?.trackTimeMillis / 1000)
      ) {
        this.playNext();
      } else {
        this.currentDuration += 1;
        emitTimerUpdated(
          this.currentDuration * 1000,
          this.currentSong?.trackTimeMillis,
        );
      }
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.interval);
  };

  pauseSong = () => {
    this.stopTimer();
    this.isPlaying = false;

    emitSongPaused();
  };

  playSong = () => {
    this.startTimer();
    this.isPlaying = true;

    emitSongPlayed();
  };

  seekToDuration = (durationInMilli: number) => {
    this.currentDuration = Math.floor(durationInMilli / 1000);
    this.startTimer();
    emitTimerUpdated(durationInMilli, this.currentSong?.trackTimeMillis);
  };
}

export default PlayerManager;
