import {
  fetchPostsResponseMock,
  postMock,
} from '@/types/__mocks__/posts.type.mock';

export const fetchPosts = jest.fn().mockResolvedValue(fetchPostsResponseMock);
export const shareVideo = jest.fn().mockResolvedValue(postMock);
