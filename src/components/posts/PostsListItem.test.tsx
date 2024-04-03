import React from 'react';
import { render, screen } from '@testing-library/react';
import { postMock } from '@/types/__mocks__/posts.type.mock';
import PostsListItem from './PostsListItem';
import { YOUTUBE_IFRAME_TITLE } from '@/constants/testing';
import { getEmbedYoutubeLink } from '@/shared/helpers';

describe('PostsListItem', () => {
  it('should render a post item', () => {
    render(
      <PostsListItem
        post={postMock}
      />,
    );
    expect(screen.getByText(postMock.title)).toBeInTheDocument();
  });

  it('should render youtube iframe correctly', () => {
    render(
      <PostsListItem
        post={postMock}
      />,
    );
    const iframe = screen.getByTitle(YOUTUBE_IFRAME_TITLE);
    expect(iframe).toHaveAttribute('src', getEmbedYoutubeLink(postMock.link));
  });
});
