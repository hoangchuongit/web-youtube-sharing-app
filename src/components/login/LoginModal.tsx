import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import React, { useContext, useState } from 'react';
import { MailIcon } from '../ui/MailIcon';
import { EyeSlashFilledIcon } from '../ui/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../ui/EyeFilledIcon';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../auth/AuthModal.css';
import { login } from '@/services/auth.service';
import { saveAuth } from '@/cookies/user.cookies';
import { AuthContext } from '@/contexts/auth-context';
import { EMAIL_REQUIRED, PASSWORD_REQUIRED } from '@/constants/errors';

type LoginModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: (isRegisterOpen?: boolean) => void;
};

const LoginModal = ({ isOpen, onOpenChange, onClose }: LoginModalProps) => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [isVisible, setIsVisible] = React.useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const formSchema = Yup.object().shape({
    email: Yup.string().required(EMAIL_REQUIRED),
    password: Yup.string().required(PASSWORD_REQUIRED),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onLoginClose = (isRegisterOpen?: boolean) => {
    reset();
    onClose(isRegisterOpen);
  };

  const onSubmit = async (data: any) => {
    setIsFetching(true);
    console.log('logining user');

    const res = await login({
      email: data.email,
      password: data.password,
    });

    setIsFetching(false);

    if (res.user?.id) {
      saveAuth(res.access_token, res.refresh_token, res.user);
      onLoginClose(false);
      setIsAuthenticated(true);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        isDismissable={false}
        className="text-black"
      >
        <ModalContent>
          {(onClose) => (
            <form
              data-testId="login-form"
              name="login-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
              <ModalBody>
                <Input
                  {...register('email')}
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  autoComplete="off"
                  aria-invalid={errors.email ? 'true' : 'false'}
                />

                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message, messages }) => {
                    if (message) {
                      return <p className="rect-hook-form-error">{message}</p>;
                    }

                    return messages
                      ? Object.entries(messages).map(([type, item]) => (
                          <p className="rect-hook-form-error" key={type}>
                            {item}
                          </p>
                        ))
                      : null;
                  }}
                />

                <Input
                  data-testId={'login-password'}
                  {...register('password')}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? 'text' : 'password'}
                  label="Password"
                  placeholder="Enter your password"
                  variant="bordered"
                  autoComplete="off"
                />

                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message, messages }) => {
                    if (message) {
                      return <p className="rect-hook-form-error">{message}</p>;
                    }

                    return messages
                      ? Object.entries(messages).map(([type, item]) => (
                          <p className="rect-hook-form-error" key={type}>
                            {item}
                          </p>
                        ))
                      : null;
                  }}
                />

                <div className="flex py-2 px-1 justify-between">
                  <Link
                    color="primary"
                    href="#javascript"
                    size="sm"
                    onClick={() => onLoginClose(true)}
                  >
                    Don&apos;t have an account yet? Register.
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  data-testId={'login-close-btn'}
                  color="danger"
                  variant="flat"
                  onClick={() => onLoginClose(false)}
                  disabled={isFetching}
                >
                  Close
                </Button>
                <Button type="submit" color="primary" disabled={isFetching}>
                  Login
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
