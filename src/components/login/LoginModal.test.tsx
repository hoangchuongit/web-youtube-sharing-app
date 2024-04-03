import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import LoginModal from './LoginModal';
import { EMAIL_REQUIRED, PASSWORD_REQUIRED } from '@/constants/errors';
import { registerParamsMock } from '@/types/__mocks__/auth.type.mock';

const onOpenChangeMock = jest.fn(() => {});
const onCloseMock = jest.fn(() => {});

describe('LoginModal', () => {
  it('should render a login form', () => {
    render(
      <LoginModal
        isOpen={true}
        onOpenChange={onOpenChangeMock}
        onClose={onCloseMock}
      />,
    );
    const form = screen.getByRole('form');
    expect(form).toHaveAttribute('name', 'login-form');
  });

  it('should display required error when value is invalid', async () => {
    render(
      <LoginModal
        isOpen={true}
        onOpenChange={onOpenChangeMock}
        onClose={onCloseMock}
      />,
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    });

    expect(screen.getByText(EMAIL_REQUIRED)).toBeInTheDocument();
    expect(screen.getByText(PASSWORD_REQUIRED)).toBeInTheDocument();
  });

  it('should not display error when value is valid', async () => {
    const logSpy = jest.spyOn(console, 'log');

    render(
      <LoginModal
        isOpen={true}
        onOpenChange={onOpenChangeMock}
        onClose={onCloseMock}
      />,
    );

    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: registerParamsMock.email,
      },
    });

    fireEvent.input(screen.getByTestId('login-password'), {
      target: {
        value: registerParamsMock.password,
      },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    });

    expect(logSpy).toBeCalledWith('logining user');
  });
});
