'use client';
import usePosts from '@/hooks/usePosts';
import React from 'react';

const PostsList = () => {
  const { posts } = usePosts();

  return (
    <div className="max-w-lg mx-auto">
      {posts.map(({ id, title, description, link, user }) => (
        <div key={id} className="p-2 rounded border-black border my-2">
          <p>Title: {title}</p>
          <p>Description: {description}</p>
          <p>Link: {link}</p>
          <p>User: {user.fullName}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
