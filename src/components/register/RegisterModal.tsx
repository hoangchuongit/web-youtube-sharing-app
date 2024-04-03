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
import { registerUser } from '@/services/auth.service';
import { saveAuth } from '@/cookies/user.cookies';
import { AuthContext } from '@/contexts/auth-context';
import {
  EMAIL_MAX_LENGTH,
  EMAIL_REQUIRED,
  EMAIL_WRONG_FORMAT,
  FIRST_NAME_MAX_LENGTH,
  FIRST_NAME_REQUIRED,
  LAST_NAME_MAX_LENGTH,
  LAST_NAME_REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORD_NOT_MATCHED,
  PASSWORD_REQUIRED,
} from '@/constants/errors';

type RegisterModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: (isLoginOpen?: boolean) => void;
};

const RegisterModal = ({
  isOpen,
  onOpenChange,
  onClose,
}: RegisterModalProps) => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required(EMAIL_REQUIRED)
      .max(50, EMAIL_MAX_LENGTH)
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, EMAIL_WRONG_FORMAT),
    firstName: Yup.string()
      .required(FIRST_NAME_REQUIRED)
      .max(50, FIRST_NAME_MAX_LENGTH),
    lastName: Yup.string()
      .required(LAST_NAME_REQUIRED)
      .max(50, LAST_NAME_MAX_LENGTH),
    password: Yup.string()
      .required(PASSWORD_REQUIRED)
      .min(8, PASSWORD_MIN_LENGTH),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password')],
      PASSWORD_NOT_MATCHED,
    ),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onRegisterClose = (isLoginOpen?: boolean) => {
    reset();
    onClose(isLoginOpen);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const onSubmit = async (data: any) => {
    setIsFetching(true);
    console.log('registering user');

    const res = await registerUser({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    });

    setIsFetching(false);

    if (res.user?.id) {
      saveAuth(res.access_token, res.refresh_token, res.user);
      onRegisterClose(false);
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
        id={'authModal'}
      >
        <ModalContent>
          {(onClose) => (
            <form
              data-testId="register-close-btn"
              name="register-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <ModalHeader className="flex flex-col gap-1">
                Register
              </ModalHeader>
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
                  data-testId={'register-first-name'}
                  {...register('firstName')}
                  label="First name"
                  placeholder="Enter your first name"
                  variant="bordered"
                  autoComplete="off"
                />

                <ErrorMessage
                  errors={errors}
                  name="firstName"
                  render={({ message, messages }) => {
                    if (message) {
                      return <p className="rect-hook-form-error">{message}</p>;
                    }

                    return messages
                      ? Object.entries(messages).map(([type, message]) => (
                          <p className="rect-hook-form-error" key={type}>
                            {message}
                          </p>
                        ))
                      : null;
                  }}
                />

                <Input
                  data-testId={'register-last-name'}
                  {...register('lastName')}
                  label="Last name"
                  placeholder="Enter your last name"
                  variant="bordered"
                  autoComplete="off"
                />

                <ErrorMessage
                  errors={errors}
                  name="lastName"
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
                  data-testId={'register-password'}
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

                <Input
                  data-testId={'register-confirm-password'}
                  {...register('confirmPassword')}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleConfirmVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isConfirmVisible ? 'text' : 'password'}
                  label="Confirm Password"
                  placeholder="Confirm password"
                  variant="bordered"
                  autoComplete="off"
                />

                <ErrorMessage
                  errors={errors}
                  name="confirmPassword"
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
                    onClick={() => onRegisterClose(true)}
                  >
                    Already have an account? Log in.
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={() => onRegisterClose(false)}
                  disabled={isFetching}
                >
                  Close
                </Button>
                <Button type="submit" color="primary" disabled={isFetching}>
                  Submit
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegisterModal;
