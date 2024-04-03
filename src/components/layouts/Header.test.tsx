import { act, fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';
import React from 'react';
import { AuthContext } from '@/contexts/auth-context';

describe('Header', () => {
  it('renders a heading', () => {
    render(<Header />);

    const heading = screen.getByRole('heading', {
      name: 'Youtube sharing',
    });

    expect(heading).toBeInTheDocument();
  });

  it('should open login modal when click to Login / Register button', async () => {
    render(<Header />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Login / Register' }));
    });

    const form = screen.getByRole('form');
    expect(form).toHaveAttribute('name', 'login-form');
  });

  it('should open register modal when click to register link', async () => {
    render(<Header />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Login / Register' }));
    });

    await act(async () => {
      fireEvent.click(
        screen.getByRole('link', {
          name: "Don't have an account yet? Register.",
        }),
      );
    });

    const form = screen.getByRole('form');
    expect(form).toHaveAttribute('name', 'register-form');
  });

  it('should open share video modal when click to Share video button', async () => {
    render(
      <AuthContext.Provider
        value={{
          isAuthenticated: true,
          setIsAuthenticated: () => {},
        }}
      >
        <Header />,
      </AuthContext.Provider>,
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Share a movie' }));
    });

    const form = screen.getByRole('form');
    expect(form).toHaveAttribute('name', 'share-movie-form');
  });
});
