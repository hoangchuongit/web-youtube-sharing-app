import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { config } from '@/constants/config';
import { NEW_SHARED_VIDEO } from '@/constants/socket';
import { fetchPosts } from '@/services/posts.service';
import { Post, PostFilterParams } from '@/types/posts.type';
import { Bounce, toast } from 'react-toastify';
import { uniqBy } from 'lodash';

const socket = io(config.apiBaseUrl as string, { autoConnect: false });

const usePosts = ({ page, perPage }: PostFilterParams) => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [hasListMore, setHasListMore] = useState<boolean>(false);

  const getAllPosts = async () => {
    const { posts, hasMore } = await fetchPosts({ page, perPage });

    setPostList((prevPostList) => {
      let newPostList = [...posts, ...prevPostList];
      newPostList = uniqBy(newPostList, 'id');
      return newPostList;
    });
    setHasListMore(hasMore);
  };

  const handleMessage = ({ title, user }: Post) => {
    const msg = `${user.fullName} just shared a new video: ${title}`;

    toast.info(msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });

    getAllPosts();
  };

  //   responseable to fetch intital data through api.
  useEffect(() => {
    getAllPosts();
  }, []);

  //   subscribes to realtime updates when post is added on server.
  useEffect(() => {
    socket.connect();

    socket.on(NEW_SHARED_VIDEO, (newData: Post) => handleMessage(newData));

    return () => {
      socket.off(NEW_SHARED_VIDEO, handleMessage);
      socket.disconnect();
    };
  }, []);

  return {
    postList,
    hasListMore,
  };
};

export default usePosts;
