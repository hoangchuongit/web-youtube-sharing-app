import {
  authFailedResponse,
  authResponseMock,
  authWrongCredentialsResponseMock,
  registerParamsMock,
} from '@/types/__mocks__/auth.type.mock';
import { authApiPath, login, registerUser } from './auth.service';
import MockAdapter from 'axios-mock-adapter';
import { apiClientBrowser } from './base.service';

jest.mock('axios', () => {
  return {
    ...(jest.requireActual('axios') as object),
    create: jest.fn().mockReturnValue(jest.requireActual('axios')),
  };
});

const mockAdapter = new MockAdapter(apiClientBrowser);

describe('login', () => {
  it('should return login resposne expected value', async () => {
    mockAdapter.onPost(`${authApiPath}/login`).reply(200, authResponseMock);

    const res = await login({
      email: registerParamsMock.email,
      password: registerParamsMock.password,
    });

    expect(res.access_token).toBe(authResponseMock.access_token);
  });

  it('should return login resposne null value', async () => {
    mockAdapter
      .onPost(`${authApiPath}/login`)
      .reply(400, authWrongCredentialsResponseMock);

    const res = await login({
      email: registerParamsMock.email,
      password: registerParamsMock.password,
    });

    console.log(res);

    expect(res.access_token).toBe(authFailedResponse.access_token);
  });
});

describe('registerUser', () => {
  it('should return register resposne expected value', async () => {
    mockAdapter.onPost(`${authApiPath}/register`).reply(200, authResponseMock);

    const res = await registerUser(registerParamsMock);
    expect(res.access_token).toBe(authResponseMock.access_token);
  });

  it('should return register resposne null value', async () => {
    mockAdapter
      .onPost(`${authApiPath}/register`)
      .reply(400, authWrongCredentialsResponseMock);

    const res = await registerUser(registerParamsMock);
    expect(res.access_token).toBe(authFailedResponse.access_token);
  });
});
