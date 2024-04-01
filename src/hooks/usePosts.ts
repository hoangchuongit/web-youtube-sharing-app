import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { config } from '@/constants/config';
import { NEW_SHARED_VIDEO } from '@/constants/socket';
import { fetchPosts } from '@/services/posts.service';
import { Post } from '@/types/posts.type';

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  //   responseable to fetch intital data through api.
  useEffect(() => {
    const getAllPosts = async () => {
      const response = await fetchPosts({ page: 1, perPage: 10 });
      console.log('Re-fresh Post list');
      setPosts(response);
    };

    getAllPosts();
  }, []);

  //   subscribes to realtime updates when post is added on server.
  useEffect(() => {
    const socket = io(config.apiBaseUrl as string);
    socket.on(NEW_SHARED_VIDEO, (newData: Post) => {
      console.log('New video added');
      setPosts((prevData) => [...prevData, newData]);
    });
  }, []);

  return {
    posts,
  };
};

export default usePosts;
