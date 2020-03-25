import * as SpotifyObjects from "./SpotifyObjects";

// +--------+
// | Albums |
// +--------+

export type GetAlbumResponse = SpotifyObjects.Album;

export type GetAlbumsResponse = {
  albums: SpotifyObjects.Album[];
};

export type GetAlbumTracksResponse = SpotifyObjects.Paging<
  SpotifyObjects.SimplifiedTrack
>;

// +---------+
// | Artists |
// +---------+

export type GetArtistResponse = SpotifyObjects.Artist;

export type GetArtistAlbumsResponse = SpotifyObjects.Paging<
  SpotifyObjects.SimplifiedAlbum
>;

export type GetArtistsResponse = {
  artists: SpotifyObjects.Artist[];
};

export type GetArtistTopTracksResponse = {
  tracks: SpotifyObjects.Track[];
};

export type GetRelatedArtistsResponse = {
  artists: SpotifyObjects.Artist[];
};

// +--------+
// | Browse |
// +--------+

export type GetAvailableGenreSeedsResponse = {
  genres: string[];
};

export type GetCategoriesResponse = {
  categories: SpotifyObjects.Paging<SpotifyObjects.Category>;
};

export type GetCategoryResponse = SpotifyObjects.Category;

export type GetCategoryPlaylistsResponse = SpotifyObjects.Paging<
  SpotifyObjects.SimplifiedPlaylist
>;

export type GetFeaturedPlaylistsResponse = {
  message: string;
  playlists: SpotifyObjects.Paging<SpotifyObjects.SimplifiedPlaylist>;
};

export type GetNewReleasesResponse = {
  message: string;
  albums: SpotifyObjects.Paging<SpotifyObjects.SimplifiedAlbum>;
};

export type GetRecommendationsResponse = {
  seeds: SpotifyObjects.RecommendationSeed[];
  tracks: SpotifyObjects.SimplifiedTrack[];
};

// +--------+
// | Follow |
// +--------+

export type GetFollowedArtistsResponse = {
  artists: SpotifyObjects.CursorBasedPaging<SpotifyObjects.Artist>;
};

// +---------+
// | Library |
// +---------+

export type GetSavedAlbumsResponse = SpotifyObjects.Paging<
  SpotifyObjects.SavedAlbum
>;

export type GetSavedTracksResponse = SpotifyObjects.Paging<
  SpotifyObjects.SavedTrack
>;

// +-----------------+
// | Personalization |
// +-----------------+

export type GetMyTopArtistsResponse = SpotifyObjects.Paging<
  SpotifyObjects.Artist
>;

export type GetMyTopTracksResponse = SpotifyObjects.Paging<
  SpotifyObjects.Track
>;

// +--------+
// | Player |
// +--------+

export type GetMyDevicesResponse = SpotifyObjects.Device[];

export type GetPlaybackInfoResponse = SpotifyObjects.CurrentlyPlayingContext;

export type GetRecentlyPlayedTracksResponse = SpotifyObjects.CursorBasedPaging<
  SpotifyObjects.PlayHistory
>;