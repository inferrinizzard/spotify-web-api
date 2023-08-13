import axios from 'axios';
import { type Mock } from 'vitest';

import { BASE_API_URL } from '../constants';

import { paramsSerializer, spotifyAxios } from './spotifyAxios';

vi.mock('axios');

const axiosMock = axios as unknown as Mock;

describe('spotifyAxios', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should successfully call Spotify's Web API with the default content type", async () => {
    axiosMock.mockResolvedValue({ data: 'foo' });
    await spotifyAxios('foo', 'GET', 'token', {
      params: {
        bar: 'baz',
      },
    });
    expect(axiosMock).toBeCalledWith({
      params: {
        bar: 'baz',
      },
      baseURL: BASE_API_URL,
      headers: {
        'Authorization': 'Bearer token',
        'Content-Type': 'application/json',
      },
      paramsSerializer,
      url: 'foo',
      method: 'GET',
    });
  });

  it("should successfully call Spotify's Web API with a custom content type", async () => {
    axiosMock.mockResolvedValue({ data: 'foo' });
    await spotifyAxios('foo', 'GET', 'token', {
      contentType: 'image/jpeg',
      data: 'bar',
    });
    expect(axiosMock).toBeCalledWith({
      data: 'bar',
      baseURL: BASE_API_URL,
      headers: {
        'Authorization': 'Bearer token',
        'Content-Type': 'image/jpeg',
      },
      paramsSerializer,
      url: 'foo',
      method: 'GET',
    });
  });

  it('should handle errors', async () => {
    const testError = { message: 'foo' };
    axiosMock.mockRejectedValue(testError);
    await expect(spotifyAxios('bar', 'GET', 'token')).rejects.toThrow('foo');
  });
});

describe('paramsSerializer', () => {
  it('should stringify arrays using the comma format', () => {
    expect(paramsSerializer({ foo: ['bar', 'baz'] })).toEqual('foo=bar%2Cbaz');
  });
});
