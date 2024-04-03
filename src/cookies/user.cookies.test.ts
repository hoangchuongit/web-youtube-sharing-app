import {
  mock_access_token,
  mock_refresh_token,
} from '@/services/__mocks__/token.mock';
import {
  clearAuth,
  getLoginedUser,
  saveAuth,
  setupIsAuthenticated,
} from './user.cookies';
import * as ReactUserCookie from 'react-use-cookie';
import { authUserResponseMock } from '@/types/__mocks__/auth.type.mock';

describe('getAllPosts', () => {
  it('should return false when there is no token storage', () => {
    expect(setupIsAuthenticated()).toEqual(false);
  });

  it('should return true when there is token storage', () => {
    jest.spyOn(ReactUserCookie, 'getCookie').mockReturnValue(mock_access_token);
    expect(setupIsAuthenticated()).toEqual(true);
  });
});

describe('getLoginedUser', () => {
  it('should return null when there is no user storage', () => {
    jest.spyOn(ReactUserCookie, 'getCookie').mockReturnValue('');
    expect(getLoginedUser()).toEqual(null);
  });

  it('should return true when there is user storage', () => {
    jest
      .spyOn(ReactUserCookie, 'getCookie')
      .mockReturnValue(JSON.stringify(authUserResponseMock));
    expect(getLoginedUser()).toEqual(authUserResponseMock);
  });
});

describe('getLoginedUser', () => {
  it('should return null when there is no user storage', () => {
    jest.spyOn(ReactUserCookie, 'getCookie').mockReturnValue('');
    expect(getLoginedUser()).toEqual(null);
  });

  it('should return true when there istoken storage', () => {
    jest
      .spyOn(ReactUserCookie, 'getCookie')
      .mockReturnValue(JSON.stringify(authUserResponseMock));
    expect(getLoginedUser()).toEqual(authUserResponseMock);
  });
});

describe('saveAuth', () => {
  it('should return null when function processed', () => {
    expect(
      saveAuth(mock_access_token, mock_refresh_token, authUserResponseMock),
    ).toEqual(undefined);
  });
});

describe('clearAuth', () => {
  it('should return null when function processed', () => {
    expect(clearAuth()).toEqual(undefined);
  });
});
