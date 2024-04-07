import { authWrongCredentialsResponseMock } from '@/types/__mocks__/auth.type.mock';
import { handleException } from './base.service';
import { screen } from '@testing-library/react';

describe('handleException', () => {
  it('should show toast with error message', async () => {
    handleException({
      response: { data: { ...authWrongCredentialsResponseMock } },
    });
    setTimeout(async () => {
      expect(
        await screen.findByText(authWrongCredentialsResponseMock.message),
      ).toBeInTheDocument();
    }, 2000);
  });

  it('should show toast with error messages', async () => {
    handleException({
      response: {
        data: {
          ...authWrongCredentialsResponseMock,
          messages: [authWrongCredentialsResponseMock.message],
        },
      },
    });
    setTimeout(async () => {
      expect(
        await screen.findByText(authWrongCredentialsResponseMock.message),
      ).toBeInTheDocument();
    }, 2000);
  });
});
