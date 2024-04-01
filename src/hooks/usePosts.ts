import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { config } from '@/constants/config';
import { NEW_SHARED_VIDEO } from '@/constants/socket';
import { fetchPosts } from '@/services/posts.service';
import { Post } from '@/types/posts.type';
import { Bounce, toast } from 'react-toastify';

const socket = io(config.apiBaseUrl as string);

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getAllPosts = async () => {
    const response = await fetchPosts({ page: 1, perPage: 10 });
    setPosts(response);
  };

  //   responseable to fetch intital data through api.
  useEffect(() => {
    getAllPosts();
  }, []);

  //   subscribes to realtime updates when post is added on server.
  useEffect(() => {
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

    socket.on(NEW_SHARED_VIDEO, (newData: Post) => {
      handleMessage(newData);
    });
  }, []);

  return {
    posts,
  };
};

export default usePosts;
