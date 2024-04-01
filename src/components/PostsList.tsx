'use client';
import usePosts from '@/hooks/usePosts';
import useWindowSize from '@/hooks/useWindowSize';
import React from 'react';

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
      {posts.map(({ id, title, description, link, user }) => (
        <div key={id} className="lg:p-2 my-10 flex flex-col lg:flex-row">
          <div className="rounded-sm">
            <iframe
              src={link.replace('watch?v=', 'embed/')}
              width={iframeWidth}
              height={iframeHeight}
            ></iframe>
          </div>
          <div className="px-2">
            <p className="text-red-monza text-lg lg:text-2xl">{title}</p>
            <p className="text-sm lg:text-md">Shared by: {user.fullName}</p>
            <p className="text-sm lg:text-md">Description:</p>
            <p className="max-h-32 text-xs overflow-clip overflow-hidden">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
