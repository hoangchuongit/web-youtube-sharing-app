import MockAdapter from 'axios-mock-adapter';
import { apiClientBrowser } from './base.service';
import { fetchPosts, postsApiPath, shareVideo } from './posts.service';
import {
  fetchPostsResponseMock,
  fetchPostsWrongResponse,
  postMock,
  postWrongResponse,
} from '@/types/__mocks__/posts.type.mock';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/constants/common';
import { shareLinkMock } from '@/__mocks__/posts.mock';

jest.mock('axios', () => {
  return {
    ...(jest.requireActual('axios') as object),
    create: jest.fn().mockReturnValue(jest.requireActual('axios')),
  };
});

const mockAdapter = new MockAdapter(apiClientBrowser);

describe('fetchPosts', () => {
  it('should return posts resposne expected value', async () => {
    mockAdapter.onPost(`${postsApiPath}`).reply(200, fetchPostsResponseMock);

    const res = await fetchPosts({
      page: DEFAULT_PAGE,
      perPage: DEFAULT_PER_PAGE,
    });

    expect(res.hasMore).toBe(fetchPostsResponseMock.hasMore);
  });

  it('should return posts resposne null value', async () => {
    mockAdapter.onPost(`${postsApiPath}`).reply(400, fetchPostsWrongResponse);

    const res = await fetchPosts({
      page: DEFAULT_PAGE,
      perPage: DEFAULT_PER_PAGE,
    });

    expect(res.hasMore).toBe(fetchPostsWrongResponse.hasMore);
  });
});

describe('shareVideo', () => {
  it('should return share video resposne expected value', async () => {
    mockAdapter.onPost(`${postsApiPath}/share-youtube`).reply(200, postMock);

    const res = await shareVideo(shareLinkMock);
    expect(res.id).toBe(postMock.id);
  });

  it('should return share video resposne null value', async () => {
    mockAdapter
      .onPost(`${postsApiPath}/share-youtube`)
      .reply(400, postWrongResponse);

    const res = await shareVideo(shareLinkMock);
    expect(res.id).toBe(postWrongResponse.id);
  });
});
