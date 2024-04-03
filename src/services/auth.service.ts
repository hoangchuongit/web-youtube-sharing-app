import { config } from '@/constants/config';
import { apiClientBrowser, handleException } from './base.service';
import { AuthResponse, LoginParams, RegisterParams } from '@/types/auth.type';
import { authFailedResponse } from '@/types/__mocks__/auth.type.mock';

export const authApiPath = `${config.apiBaseUrl}/auth`;

export async function login({
  email,
  password,
}: LoginParams): Promise<AuthResponse> {
  try {
    const res = await apiClientBrowser.post(`${authApiPath}/login`, {
      email,
      password,
    });

    if (!res?.data) {
      console.log(res);
      console.log('Have some error');
    }

    return res?.data;
  } catch (err) {
    handleException(err);
    return authFailedResponse;
  }
}

export async function registerUser(
  params: RegisterParams,
): Promise<AuthResponse> {
  try {
    const res = await apiClientBrowser.post(`${authApiPath}/register`, params);

    if (!res?.data) {
      console.log(res);
      console.log('Have some error');
    }

    return res?.data;
  } catch (err: any) {
    handleException(err);
    return authFailedResponse;
  }
}
