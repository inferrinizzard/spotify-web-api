import { Http } from '../helpers/Http';
import * as types from '../types';

export class AlbumsApi {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  /**
   * Get an Album
   *
   * Get Spotify catalog information for a single album.
   *
   * @param albumId The Spotify ID for the album.
   * @param options Optional request information.
   */
  async getAlbum(albumId: string, options?: types.MarketOptions) {
    return this.http.get<types.Album>(
      `/albums/${albumId}`,
      options && { params: options },
    );
  }

  /**
   * Get Several Albums
   *
   * Get Spotify catalog information for multiple albums identified by their
   * Spotify IDs.
   *
   * @param albumIds The Spotify IDs for the albums.
   * @param options Optional request information.
   */
  async getAlbums(albumIds: string[], options?: types.MarketOptions) {
    return this.http
      .get<types.GetAlbumsResponse>('/albums', {
        params: {
          ...options,
          ids: albumIds,
        },
      })
      .then(response => response.albums);
  }

  /**
   * Get an Album's Tracks
   *
   * Get Spotify catalog information about an album's tracks.
   *
   * @param albumId The Spotify ID for the album.
   * @param options Optional request information.
   */
  async getAlbumTracks(albumId: string, options?: types.GetAlbumTracksOptions) {
    return this.http.get<types.GetAlbumTracksResponse>(
      `/albums/${albumId}/tracks`,
      options && { params: options },
    );
  }
}
