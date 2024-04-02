import { ACCESS_TOKEN, LOGINED_USER, REFRESH_TOKEN } from '@/constants/cookies';
import { apiClientBrowser } from '@/services/base.service';
import { AuthUserResponse } from '@/types/auth.type';
import { getCookie, setCookie } from 'react-use-cookie';

export const setupIsAuthenticated = (): boolean => {
  // check if token exist
  const token = getCookie(ACCESS_TOKEN);

  if (token) {
    apiClientBrowser.defaults.headers['Authorization'] = 'Bearer ' + token;
    return true;
  }
  return false;
};

export const getLoginedUser = (): AuthUserResponse | null => {
  const user = getCookie(LOGINED_USER);

  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const saveAuth = (
  accessToken: string,
  refreshToken: string,
  user: AuthUserResponse,
): void => {
  setCookie(ACCESS_TOKEN, accessToken, {
    days: 1,
    SameSite: 'Strict',
    Secure: true,
  });

  setCookie(REFRESH_TOKEN, refreshToken, {
    SameSite: 'Strict',
    Secure: true,
  });

  setCookie(LOGINED_USER, JSON.stringify(user), {
    SameSite: 'Strict',
    Secure: true,
  });
};

export const clearAuth = (): void => {
  setCookie(ACCESS_TOKEN, '');
  setCookie(REFRESH_TOKEN, '');
  setCookie(LOGINED_USER, '');
};
