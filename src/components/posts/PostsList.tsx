'use client';
import usePosts from '@/hooks/usePosts';
import useWindowSize from '@/hooks/useWindowSize';
import React, { useEffect, useState } from 'react';
import PostsListItem from './PostsListItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DEFAULT_MAX_PER_PAGE, DEFAULT_PAGE, NO_POST_AVAILABLE } from '@/constants/common';

const PostsList = () => {
  const size = useWindowSize();

  const [page, setPage] = useState(DEFAULT_PAGE);
  const { postList, hasListMore } = usePosts({
    page,
    perPage: DEFAULT_MAX_PER_PAGE,
  });

  useEffect(() => {
    // TODO: Loading more Page here
  }, [page]);

  const nextHandle = () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  let iframeHeight = '250';
  let iframeWidth = '450';

  if (size?.width < 1000) {
    iframeWidth = '100%';
    iframeHeight = '225';
  }

  return (
    // <InfiniteScroll
    //   dataLength={postList.length}
    //   next={nextHandle}
    //   hasMore={hasListMore}
    //   loader={
    //     <div className="text-center">
    //       <img
    //         className="mx-auto h-20 lg:h-32"
    //         src={'images/loading.gif'}
    //         alt={'Loading icon'}
    //       />
    //       <p className="text-lg text-gray-800 tracking-wide text-center">
    //         Loading more posts
    //       </p>
    //     </div>
    //   }
    //   endMessage={
    //     <p className="text-lg text-gray-800 tracking-wide text-center">
    //       <b>Yay! You have seen it all</b>
    //     </p>
    //   }
    // >
    <div className="w-full max-w-7xl mx-auto">
      {postList.map((post) => (
        <PostsListItem key={post.id} post={post} />
      ))}

      {postList.length === 0 && (
        <p className="text-lg text-gray-800 tracking-wide text-center">
          <b>{NO_POST_AVAILABLE}</b>
        </p>
      )}
    </div>
    // </InfiniteScroll>
  );
};

export default PostsList;
