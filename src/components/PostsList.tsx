'use client';
import usePosts from '@/hooks/usePosts';
import useWindowSize from '@/hooks/useWindowSize';
import React from 'react';
import PostsListItem from './PostsListItem';

const PostsList = () => {
  const { posts } = usePosts();
  const size = useWindowSize();

  let iframeHeight = '250';
  let iframeWidth = '450';

  if (size?.width < 1000) {
    iframeWidth = '100%';
    iframeHeight = '225';
  }

  return (
    <div className="max-w-7xl mx-auto">
      {posts.map((post) => (
        <PostsListItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
