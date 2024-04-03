import { authResponseMock } from '../../types/__mocks__/auth.type.mock';

export const registerUser = jest.fn().mockResolvedValue(authResponseMock);
export const login = jest.fn().mockResolvedValue(authResponseMock);
