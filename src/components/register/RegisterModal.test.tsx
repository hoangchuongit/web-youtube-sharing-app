import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { EMAIL_REQUIRED, EMAIL_WRONG_FORMAT, FIRST_NAME_REQUIRED, LAST_NAME_REQUIRED, PASSWORD_MIN_LENGTH, PASSWORD_REQUIRED } from '@/constants/errors';
import RegisterModal from './RegisterModal';
import { emailWrongFormatMock, passwordWrongFormatMock } from '@/__mocks__/auth.mock';
import { authUserResponseMock, registerParamsMock } from '@/types/__mocks__/auth.type.mock';
import { login } from '@/services/__mocks__/auth.service';

const onOpenChangeMock = jest.fn(() => {});
const onCloseMock = jest.fn(() => {});

describe('RegisterModal', () => {
  it('should render a register form', () => {
    render(
      <RegisterModal
        isOpen={true}
        onOpenChange={onOpenChangeMock}
        onClose={onCloseMock}
      />,
    );
    const form = screen.getByRole("form");
    expect(form).toHaveAttribute("name", "register-form");
  });

  it("should display required error when value is invalid", async () => { 
    render(
      <RegisterModal
        isOpen={true}
        onOpenChange={onOpenChangeMock}
        onClose={onCloseMock}
      />,
    );

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    });
    
    expect(screen.getByText(EMAIL_REQUIRED)).toBeInTheDocument();
    expect(screen.getByText(FIRST_NAME_REQUIRED)).toBeInTheDocument();
    expect(screen.getByText(LAST_NAME_REQUIRED)).toBeInTheDocument();
    expect(screen.getByText(PASSWORD_REQUIRED)).toBeInTheDocument();
  })

  it("should display matching error when email is invalid", async () => {
    render(
      <RegisterModal
        isOpen={true}
        onOpenChange={onOpenChangeMock}
        onClose={onCloseMock}
      />,
    );

      fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
        target: {
          value: emailWrongFormatMock,
        },
      })
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    });
  
    expect(screen.getByText(EMAIL_WRONG_FORMAT)).toBeInTheDocument();
  })

  it("should display min length error when password is invalid", async () => {
    render(
      <RegisterModal
        isOpen={true}
        onOpenChange={onOpenChangeMock}
        onClose={onCloseMock}
      />,
    );
  
    fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
      target: {
        value: authUserResponseMock.email,
      },
    })


    fireEvent.input(screen.getByTestId('register-password'), {
      target: {
        value: passwordWrongFormatMock,
      },
    })
  
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    });

    expect(screen.getByText(PASSWORD_MIN_LENGTH)).toBeInTheDocument();
  })

  it("should not display error when value is valid", async () => {
    const logSpy = jest.spyOn(console, 'log');

    render(
      <RegisterModal
        isOpen={true}
        onOpenChange={onOpenChangeMock}
        onClose={onCloseMock}
      />,
    );
  
    fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
      target: {
        value: registerParamsMock.email,
      },
    });

    fireEvent.input(screen.getByTestId('register-first-name'), {
      target: {
        value: registerParamsMock.firstName,
      },
    });

    fireEvent.input(screen.getByTestId('register-last-name'), {
      target: {
        value: registerParamsMock.lastName,
      },
    });

    fireEvent.input(screen.getByTestId('register-password'), {
      target: {
        value: registerParamsMock.password,
      },
    })

    fireEvent.input(screen.getByTestId('register-confirm-password'), {
      target: {
        value: registerParamsMock.password,
      },
    })

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    });
  
    expect(logSpy).toBeCalledWith('registering user');
  })
});
