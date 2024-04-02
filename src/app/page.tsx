'use client';
import Header from '@/components/layouts/Header';
import PostsList from '@/components/posts/PostsList';
import { AuthContext } from '@/contexts/auth-context';
import { setupIsAuthenticated } from '@/cookies/user.cookies';
import { NextUIProvider } from '@nextui-org/system';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    setupIsAuthenticated(),
  );

  return (
    <NextUIProvider>
      <AuthContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
        }}
      >
        <main className="flex min-h-screen flex-col items-center justify-between px-4 lg:px-24 bg-white text-black">
          <Header />
          <PostsList />
          <ToastContainer />
        </main>
      </AuthContext.Provider>
    </NextUIProvider>
  );
}
