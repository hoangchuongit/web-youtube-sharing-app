import React from 'react';
import { render, screen } from '@testing-library/react';
import { postMock } from '@/types/__mocks__/posts.type.mock';
import PostsList from './PostsList';
import { NO_POST_AVAILABLE } from '@/constants/common';

describe('PostsList', () => {
  it('should render a post list', () => {
    render(
      <PostsList />,
    );
    expect(screen.getByText(NO_POST_AVAILABLE)).toBeInTheDocument();
  });
});
