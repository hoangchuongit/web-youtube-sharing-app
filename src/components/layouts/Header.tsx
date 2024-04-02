'use client';
import { Button, useDisclosure } from '@nextui-org/react';
import React, { useContext, useEffect, useState } from 'react';
import LoginModal from '../login/LoginModal';
import RegisterModal from '../register/RegisterModal';
import { AuthContext } from '@/contexts/auth-context';
import { clearAuth, getLoginedUser } from '@/cookies/user.cookies';

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const { onOpen, onOpenChange } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState<any>({});

  const onAuthOpen = () => {
    onOpen();
    setIsOpen(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const loginedUser = getLoginedUser();
      setUser(loginedUser as any);
      return;
    }
    setUser({});
  }, [isAuthenticated]);

  const onLoginClose = (isRegisterOpen?: boolean) => {
    setIsOpen(false);
    if (isRegisterOpen) {
      setIsRegisterOpen(true);
    }
  };

  const onRegisterClose = (isLoginOpen?: boolean) => {
    setIsRegisterOpen(false);
    if (isLoginOpen) {
      setIsOpen(true);
    }
  };

  const onLogout = () => {
    setIsAuthenticated(false);
    clearAuth();
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto flex flex-row justify-between items-center border-b-4 p-2">
        <div className="logo flex flex-row items-center">
          <img
            className="h-20 w-20 lg:h-32 lg:w-32 rounded-full"
            src={'images/logo.png'}
            alt={'Funny movie logo'}
          />
          <h1 className="hidden lg:block ml-2 text-2xl font-bold">
            Youtube sharing
          </h1>
        </div>
        <div className="navigate">
          {isAuthenticated ? (
            <div className="flex flex-col lg:flex-row items-center">
              <h1 className="text-sm font-bold" style={{ textAlign: 'right' }}>
                Welcome {user?.fullName}
              </h1>

              <div className="flex flex-row">
                <Button className="mx-2" onClick={onAuthOpen} color="primary">
                  Share a movie
                </Button>

                <Button onClick={onLogout} color="danger">
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Button onClick={onAuthOpen} color="primary">
                Login / Register
              </Button>
            </>
          )}
        </div>
      </div>

      <LoginModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onLoginClose}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onOpenChange={onOpenChange}
        onClose={onRegisterClose}
      />
    </>
  );
};

export default Header;
