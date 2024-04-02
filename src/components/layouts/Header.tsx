import { Button, useDisclosure } from '@nextui-org/react';
import React, { useState } from 'react';
import AuthModal from '../register/RegisterModal';
import LoginModal from '../login/LoginModal';
import RegisterModal from '../register/RegisterModal';

const Header = () => {
  const { onOpen, onOpenChange } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const onAuthOpen = () => {
    onOpen();
    setIsOpen(true);
  };

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
          <Button onClick={onAuthOpen} color="primary">
            Login / Register
          </Button>
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
