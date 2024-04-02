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
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email Address is required')
      .max(50, 'Email must not exceed 50 characters')
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        'Entered value does not match email format',
      ),
    firstName: Yup.string()
      .required('First name is required')
      .max(50, 'First name must not exceed 50 characters'),
    lastName: Yup.string()
      .required('Last name is required')
      .max(50, 'Last name must not exceed 50 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at 8 char long')
      .matches(
        /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/g,
        'Password must contain min 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password')],
      'Passwords does not match',
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
    console.log(data);
    onRegisterClose(false);
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    href="javascript:void(0)"
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
                >
                  Close
                </Button>
                <Button type="submit" color="primary">
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
