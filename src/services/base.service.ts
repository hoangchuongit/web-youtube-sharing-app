import { SERVER_ERROR } from '@/constants/common';
import axios from 'axios';
import { isArray } from 'lodash';
import { Bounce, toast } from 'react-toastify';

/**
 * Axios instance for browser,
 * with `x-access-token` header injected
 */
export const apiClientBrowser = axios.create();

export const handleException = (err: any) => {
  console.error(err);
  let msg = SERVER_ERROR;
  const messages = err?.response?.data?.message;

  if (!!messages) {
    msg = isArray(messages) ? messages[0] : messages;
  }

  toast.error(msg, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });
};
