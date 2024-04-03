'use client';
import useWindowSize from '@/hooks/useWindowSize';
import React, { useEffect, useState } from 'react';
import {
  DEFAULT_MAX_PER_PAGE,
  DEFAULT_PAGE,
  NO_POST_AVAILABLE,
} from '@/constants/common';
import PostsListItem from './PostsListItem';
import usePosts from '@/hooks/usePosts';

const PostsList = () => {
  const size = useWindowSize();

  const [isInit, setInit] = useState(true);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const { postList, hasListMore, isFetching } = usePosts({
    page,
    perPage: DEFAULT_MAX_PER_PAGE,
  });

  useEffect(() => {
    if (isFetching || !isInit) return;
    setInit(false);
  }, [isFetching, isInit]);

  let iframeHeight = '250';
  let iframeWidth = '450';

  if (size?.width < 1000) {
    iframeWidth = '100%';
    iframeHeight = '225';
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {isInit && isFetching && (
        <img
          className="mx-auto h-32 lg:h-40"
          src={'images/loading.gif'}
          alt={'Loading icon'}
        />
      )}
      {!isInit && (
        <>
          {postList.map((post) => (
            <PostsListItem key={post.id} post={post} />
          ))}

          {postList.length === 0 && (
            <p className="text-lg text-gray-800 tracking-wide text-center">
              <b>{NO_POST_AVAILABLE}</b>
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PostsList;
