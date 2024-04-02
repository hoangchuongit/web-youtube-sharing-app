import PostsList from '@/components/posts/PostsList';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 lg:p-24 bg-white text-black">
      <h1 className="font-bold text-2xl text-center mt-3">Posts</h1>
      <PostsList />
      <ToastContainer />
    </main>
  );
}
