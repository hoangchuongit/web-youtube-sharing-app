import { config } from '@/constants/config';
import { apiClientBrowser } from './base.service';
import { AuthResponse, LoginParams, RegisterParams } from '@/types/auth.type';

const authApiPath = `${config.apiBaseUrl}/auth`;

export async function login({
  email,
  password,
}: LoginParams): Promise<AuthResponse> {
  try {
    const res = await apiClientBrowser.get(`${authApiPath}/login`, {
      params: {
        email,
        password,
      },
    });

    if (!res?.data) {
      console.log(res);
      console.log('Have some error');
    }

    return res?.data;
  } catch (err) {
    console.error(err);
    return {
      access_token: '',
      refresh_token: '',
      user: undefined,
    };
  }
}

export async function register(params: RegisterParams): Promise<AuthResponse> {
  try {
    const res = await apiClientBrowser.get(`${authApiPath}/register`, {
      params,
    });

    if (!res?.data) {
      console.log(res);
      console.log('Have some error');
    }

    return res?.data;
  } catch (err) {
    console.error(err);
    return {
      access_token: '',
      refresh_token: '',
      user: undefined,
    };
  }
}
