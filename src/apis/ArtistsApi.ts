import { Http } from '../helpers/Http';
import * as types from '../types';

export class ArtistsApi {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  /**
   * Get an Artist
   *
   * Get Spotify catalog information for a single artist identified by their
   * unique Spotify ID.
   *
   * @param artistId The Spotify ID for the artist.
   */
  async getArtist(artistId: string) {
    return this.http.get<types.Artist>(`/artists/${artistId}`);
  }

  /**
   * Get an Artist's Albums
   *
   * Get Spotify catalog information about an artist's albums.
   *
   * @param artistId The Spotify ID for the artist.
   * @param options Optional request information.
   */
  async getArtistAlbums(
    artistId: string,
    options?: types.GetArtistAlbumsOptions,
  ) {
    return this.http.get<types.GetArtistAlbumsResponse>(
      `/artists/${artistId}/albums`,
      options && { params: options },
    );
  }

  /**
   * Get Several Artists
   *
   * Get Spotify catalog information for several artists based on their
   * Spotify IDs.
   *
   * @param artistIds The Spotify IDs for the artists.
   */
  async getArtists(artistIds: string[]) {
    return this.http
      .get<types.GetArtistsResponse>('/artists', {
        params: {
          ids: artistIds,
        },
      })
      .then(response => response.artists);
  }

  /**
   * Get an Artist's Top Tracks
   *
   * Get Spotify catalog information about an artist's top tracks by country.
   *
   * @param artistId The Spotify ID for the artist.
   * @param country An ISO 3166-1 alpha-2 country code or the string `from_token`.
   */
  async getArtistTopTracks(artistId: string, country: string) {
    return this.http
      .get<types.GetArtistTopTracksResponse>(
        `/artists/${artistId}/top-tracks`,
        {
          params: {
            country,
          },
        },
      )
      .then(response => response.tracks);
  }

  /**
   * Get an Artist's Related Artists
   *
   * Get Spotify catalog information about artists similar to a given artist.
   * Similarity is based on analysis of the Spotify community's listening
   * history.
   *
   * @param artistId The Spotify ID for the artist.
   */
  async getRelatedArtists(artistId: string) {
    return this.http
      .get<types.GetRelatedArtistsResponse>(
        `/artists/${artistId}/related-artists`,
      )
      .then(response => response.artists);
  }
}
