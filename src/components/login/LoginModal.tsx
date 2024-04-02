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
import React from 'react';
import { MailIcon } from '../ui/MailIcon';
import { EyeSlashFilledIcon } from '../ui/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../ui/EyeFilledIcon';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../auth/AuthModal.css';

type LoginModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: (isRegisterOpen?: boolean) => void;
};

const LoginModal = ({ isOpen, onOpenChange, onClose }: LoginModalProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const formSchema = Yup.object().shape({
    email: Yup.string().required('Email Address is required'),
    password: Yup.string().required('Password is required'),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onRegisterRedirect = () => {
    onLoginClose(true);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onLoginClose = (isRegisterOpen?: boolean) => {
    reset();
    onClose(isRegisterOpen);
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    onLoginClose(false);
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    href="javascript:void(0)"
                    size="sm"
                    onClick={() => onLoginClose(true)}
                  >
                    Don&apos;t have an account yet? Register.
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={() => onLoginClose(false)}
                >
                  Close
                </Button>
                <Button type="submit" color="primary">
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