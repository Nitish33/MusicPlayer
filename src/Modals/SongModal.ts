export default class SongModal {
  artistId: number;
  artistName: string;
  artWorkUrl: string;
  releaseDate: string;
  name: string;
  id: number;
  primaryGenreName: string;
  trackTimeMillis: number;

  constructor(data: any) {
    this.artistId = data.artistId;
    this.artistName = data.artistName;
    this.artWorkUrl = data.artworkUrl100;
    this.releaseDate = data.releaseDate;
    this.name = data.trackName;
    this.id = data.trackId;
    this.primaryGenreName = data.primaryGenreName;
    this.trackTimeMillis = data.trackTimeMillis;
  }

  getArtWorkImageWithSize = (width: number, height: number) => {
    return this.artWorkUrl.replace('100x100', `${width}x${height}`);
  };

  getTimeString = () => {
    const totalSecons = this.trackTimeMillis / 1000;

    const minutes = Math.floor(totalSecons / 60);
    const seconds = totalSecons % 60;

    return `${minutes}:${seconds}`;
  };

  getTimeInSeconds = () => {
    return Math.floor(this.trackTimeMillis / 1000);
  };
}
