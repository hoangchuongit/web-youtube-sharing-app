import React from 'react';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import PostsList from './PostsList';
import { NO_POST_AVAILABLE } from '@/constants/common';
import {
  fetchPostsResponseMock,
  postMock,
} from '@/types/__mocks__/posts.type.mock';
import { YOUTUBE_IFRAME_TITLE } from '@/constants/testing';
import { getEmbedYoutubeLink } from '@/shared/helpers';

jest.mock('@/hooks/usePosts', () => ({
  __esModule: true,
  default: () => ({
    postList: fetchPostsResponseMock.posts,
    hasMore: fetchPostsResponseMock.hasMore,
    isFetching: false,
  }),
}));

describe('PostsList', () => {
  it('should render a no post available after fetching post', async () => {
    render(<PostsList />);
    const iframe = screen.getByTitle(YOUTUBE_IFRAME_TITLE);
    expect(iframe).toHaveAttribute('src', getEmbedYoutubeLink(postMock.link));
  });
});
