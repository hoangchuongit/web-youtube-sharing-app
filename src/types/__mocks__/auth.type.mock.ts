import {
  mock_access_token,
  mock_refresh_token,
} from '@/services/__mocks__/token.mock';
import { AuthResponse, AuthUserResponse, RegisterParams } from '../auth.type';

export const authUserResponseMock: AuthUserResponse = {
  id: '66082b5a841b182aeaed4e67',
  email: 'johndoe@example.com',
  fullName: 'John Doe',
};

export const registerParamsMock: RegisterParams = {
  email: authUserResponseMock.email,
  password: '1232@asdS',
  firstName: 'John',
  lastName: 'Doe',
};

export const authResponseMock: AuthResponse = {
  access_token: mock_access_token,
  refresh_token: mock_refresh_token,
  user: authUserResponseMock,
};

export const authFailedResponse: AuthResponse = {
  access_token: '',
  refresh_token: '',
  user: undefined,
};

export const authWrongCredentialsResponseMock = {
  message: 'Wrong credentials!!',
  error: 'Bad Request',
  statusCode: 400,
};
