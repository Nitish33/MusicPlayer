import mitt from 'mitt';
import SongModal from '../Modals/SongModal';
import {PlayerEvent} from '../Utils/Enums';

const eventEmitter = mitt();

export function registerEventListener(listener: any, type: PlayerEvent) {
  eventEmitter.on(type, listener);
}

export function removeListener(listener: any, type: PlayerEvent) {
  eventEmitter.off(type, listener);
}

export function emitSongChangedEvent(song: SongModal, index: number) {
  eventEmitter.emit(PlayerEvent.SONG_CHANGED, {song, index});
}

export function emitTimerUpdated(current: number, total: number) {
  eventEmitter.emit(PlayerEvent.TIMER_UPDATED, {current, total});
}

export function emitSongPlayed() {
  eventEmitter.emit(PlayerEvent.MUSIC_PLAY, {songPlaying: true});
}

export function emitSongPaused() {
  eventEmitter.emit(PlayerEvent.MUSIC_STOP, {songPlaying: false});
}
