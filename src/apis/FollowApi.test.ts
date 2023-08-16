import { type MockedClass } from 'vitest';

import { getFollowedArtistsFixture } from '../fixtures';
import { Http } from '../helpers/Http';

import { FollowApi } from './FollowApi';

vi.mock('../helpers/Http');

const HttpMock = Http as MockedClass<typeof Http>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function setup() {
  const httpMock = new HttpMock('token');
  const follow = new FollowApi();

  return { httpMock, follow };
}

describe('FollowApi', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('areFollowingPlaylist', () => {
    beforeEach(() => {
      HttpMock.prototype.get.mockResolvedValue([true, false]);
    });

    it.todo('should check if users follow a playlist', async () => {
      const { httpMock, follow } = setup();

      const response = await follow.areFollowingPlaylist('foo', ['bar', 'baz']);

      expect(response).toEqual([true, false]);
      expect(httpMock.get).toHaveBeenCalledWith(
        '/playlists/foo/followers/contains',
        {
          params: {
            ids: ['bar', 'baz'],
          },
        },
      );
    });
  });

  describe('followArtist', () => {
    it.todo('should follow an artist', async () => {
      const { httpMock, follow } = setup();

      await follow.followArtist('foo');

      expect(httpMock.put).toHaveBeenCalledWith('/me/following', {
        params: {
          type: 'artist',
        },
        data: {
          ids: ['foo'],
        },
      });
    });
  });

  describe('followArtists', () => {
    it.todo('should follow artists', async () => {
      const { httpMock, follow } = setup();

      await follow.followArtists(['foo', 'bar']);

      expect(httpMock.put).toHaveBeenCalledWith('/me/following', {
        params: {
          type: 'artist',
        },
        data: {
          ids: ['foo', 'bar'],
        },
      });
    });
  });

  describe('followPlaylist', () => {
    it.todo('should follow a playlist (without options)', async () => {
      const { httpMock, follow } = setup();

      await follow.followPlaylist('foo');

      expect(httpMock.put).toHaveBeenCalledWith(
        '/playlists/foo/followers',
        undefined,
      );
    });

    it.todo('should follow a playlist (with options)', async () => {
      const { httpMock, follow } = setup();

      await follow.followPlaylist('foo', { public: false });

      expect(httpMock.put).toHaveBeenCalledWith('/playlists/foo/followers', {
        data: {
          public: false,
        },
      });
    });
  });

  describe('followUser', () => {
    it.todo('should follow a user', async () => {
      const { httpMock, follow } = setup();

      await follow.followUser('foo');

      expect(httpMock.put).toHaveBeenCalledWith('/me/following', {
        params: {
          type: 'user',
        },
        data: {
          ids: ['foo'],
        },
      });
    });
  });

  describe('followUsers', () => {
    it.todo('should follow users', async () => {
      const { httpMock, follow } = setup();

      await follow.followUsers(['foo', 'bar']);

      expect(httpMock.put).toHaveBeenCalledWith('/me/following', {
        params: {
          type: 'user',
        },
        data: {
          ids: ['foo', 'bar'],
        },
      });
    });
  });

  describe('getFollowedArtists', () => {
    beforeEach(() => {
      HttpMock.prototype.get.mockResolvedValue(getFollowedArtistsFixture);
    });

    it.todo(
      "should get user's followed artists (without options)",
      async () => {
        const { httpMock, follow } = setup();

        const response = await follow.getFollowedArtists();

        expect(response).toEqual(getFollowedArtistsFixture.artists);
        expect(httpMock.get).toHaveBeenCalledWith('/me/following', {
          params: {
            type: 'artist',
          },
        });
      },
    );

    it.todo("should get user's followed artists (with options)", async () => {
      const { httpMock, follow } = setup();

      const response = await follow.getFollowedArtists({ limit: 2 });

      expect(response).toEqual(getFollowedArtistsFixture.artists);
      expect(httpMock.get).toHaveBeenCalledWith('/me/following', {
        params: {
          limit: 2,
          type: 'artist',
        },
      });
    });
  });

  describe('isFollowingArtist', () => {
    beforeEach(() => {
      HttpMock.prototype.get.mockResolvedValue([true]);
    });

    it.todo('should check if current user follows artist', async () => {
      const { httpMock, follow } = setup();

      const response = await follow.isFollowingArtist('foo');

      expect(response).toBeTruthy();
      expect(httpMock.get).toHaveBeenCalledWith('/me/following/contains', {
        params: {
          ids: ['foo'],
          type: 'artist',
        },
      });
    });
  });

  describe('isFollowingArtists', () => {
    beforeEach(() => {
      HttpMock.prototype.get.mockResolvedValue([true, false]);
    });

    it.todo('should check if current user follows artists', async () => {
      const { httpMock, follow } = setup();

      const response = await follow.isFollowingArtists(['foo', 'bar']);

      expect(response).toEqual([true, false]);
      expect(httpMock.get).toHaveBeenCalledWith('/me/following/contains', {
        params: {
          ids: ['foo', 'bar'],
          type: 'artist',
        },
      });
    });
  });

  describe('isFollowingPlaylist', () => {
    beforeEach(() => {
      HttpMock.prototype.get.mockResolvedValue([true]);
    });

    it.todo('should check if a user follows a playlist', async () => {
      const { httpMock, follow } = setup();

      const response = await follow.isFollowingPlaylist('foo', 'bar');

      expect(response).toBeTruthy();
      expect(httpMock.get).toHaveBeenCalledWith(
        '/playlists/foo/followers/contains',
        {
          params: {
            ids: ['bar'],
          },
        },
      );
    });
  });

  describe('isFollowingUser', () => {
    beforeEach(() => {
      HttpMock.prototype.get.mockResolvedValue([true]);
    });

    it.todo('should check if the current user follows a user', async () => {
      const { httpMock, follow } = setup();

      const response = await follow.isFollowingUser('foo');

      expect(response).toBeTruthy();
      expect(httpMock.get).toHaveBeenCalledWith('/me/following/contains', {
        params: {
          ids: ['foo'],
          type: 'user',
        },
      });
    });
  });

  describe('isFollowingUsers', () => {
    beforeEach(() => {
      HttpMock.prototype.get.mockResolvedValue([true, false]);
    });

    it.todo('should check if current user follows users', async () => {
      const { httpMock, follow } = setup();

      const response = await follow.isFollowingUsers(['foo', 'bar']);

      expect(response).toEqual([true, false]);
      expect(httpMock.get).toHaveBeenCalledWith('/me/following/contains', {
        params: {
          ids: ['foo', 'bar'],
          type: 'user',
        },
      });
    });
  });

  describe('unfollowArtist', () => {
    it.todo('should unfollow an artist', async () => {
      const { httpMock, follow } = setup();

      await follow.unfollowArtist('foo');

      expect(httpMock.delete).toHaveBeenCalledWith('/me/following', {
        params: {
          type: 'artist',
        },
        data: {
          ids: ['foo'],
        },
      });
    });
  });

  describe('unfollowArtists', () => {
    it.todo('should unfollow artists', async () => {
      const { httpMock, follow } = setup();

      await follow.unfollowArtists(['foo', 'bar']);

      expect(httpMock.delete).toHaveBeenCalledWith('/me/following', {
        params: {
          type: 'artist',
        },
        data: {
          ids: ['foo', 'bar'],
        },
      });
    });
  });

  describe('unfollowPlaylist', () => {
    it.todo('should unfollow a playlist', async () => {
      const { httpMock, follow } = setup();

      await follow.unfollowPlaylist('foo');

      expect(httpMock.delete).toHaveBeenCalledWith('/playlists/foo/followers');
    });
  });

  describe('unfollowUser', () => {
    it.todo('should unfollow a user', async () => {
      const { httpMock, follow } = setup();

      await follow.unfollowUser('foo');

      expect(httpMock.delete).toHaveBeenCalledWith('/me/following', {
        params: {
          type: 'user',
        },
        data: {
          ids: ['foo'],
        },
      });
    });
  });

  describe('unfollowUsers', () => {
    it.todo('should unfollow users', async () => {
      const { httpMock, follow } = setup();

      await follow.unfollowUsers(['foo', 'bar']);

      expect(httpMock.delete).toHaveBeenCalledWith('/me/following', {
        params: {
          type: 'user',
        },
        data: {
          ids: ['foo', 'bar'],
        },
      });
    });
  });
});
