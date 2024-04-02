import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../auth/AuthModal.css';
import { shareVideo } from '@/services/posts.service';

type ShareMovieModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
};

const ShareMovieModal = ({
  isOpen,
  onOpenChange,
  onClose,
}: ShareMovieModalProps) => {
  const [isFetching, setIsFetching] = useState(false);

  const formSchema = Yup.object().shape({
    link: Yup.string()
      .required('Link is required')
      .matches(
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
        'The youtube link is not valid',
      ),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onShareVideoClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: any) => {
    setIsFetching(true);
    const res = await shareVideo(data.link);
    setIsFetching(false);
    if (res?.id) {
      onShareVideoClose();
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Share new video
              </ModalHeader>
              <ModalBody>
                <Input
                  {...register('link')}
                  autoFocus
                  label="Link"
                  placeholder="Enter your Video link"
                  variant="bordered"
                  autoComplete="off"
                />

                <ErrorMessage
                  errors={errors}
                  name="link"
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
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={onShareVideoClose}
                  disabled={isFetching}
                >
                  Close
                </Button>
                <Button type="submit" color="primary" disabled={isFetching}>
                  Share
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShareMovieModal;
