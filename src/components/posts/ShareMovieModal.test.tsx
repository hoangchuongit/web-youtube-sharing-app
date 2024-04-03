import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LINK_REQUIRED, LINK_WRONG_FORMAT } from '@/constants/errors';
import ShareMovieModal from './ShareMovieModal';
import { linkWrongFormatMock } from '@/__mocks__/posts.mock';
import { postMock } from '@/types/__mocks__/posts.type.mock';

const onOpenChangeMock = jest.fn(() => {});
const onCloseMock = jest.fn(() => {});

describe('ShareMovieModal', () => {
  it('should render a share movie form', () => {
    render(
      <ShareMovieModal
        isOpen={true}
        onOpenChange={onOpenChangeMock}
        onClose={onCloseMock}
      />,
    );
    const form = screen.getByRole("form");
    expect(form).toHaveAttribute("name", "share-movie-form");
  });

  it("should display required error when value is invalid", async () => { 
    render(
      <ShareMovieModal
        isOpen={true}
        onOpenChange={onOpenChangeMock}
        onClose={onCloseMock}
      />,
    );

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Share" }));
    });
    
    expect(screen.getByText(LINK_REQUIRED)).toBeInTheDocument();
  })

  it("should display matching error when link is invalid", async () => {
    render(
      <ShareMovieModal
        isOpen={true}
        onOpenChange={onOpenChangeMock}
        onClose={onCloseMock}
      />,
    );

      fireEvent.input(screen.getByRole("textbox", { name: /link/i }), {
        target: {
          value: linkWrongFormatMock,
        },
      })
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Share" }));
    });
  
    expect(screen.getByText(LINK_WRONG_FORMAT)).toBeInTheDocument();
  })

  it("should not display error when value is valid", async () => {
    const logSpy = jest.spyOn(console, 'log');

    render(
      <ShareMovieModal
        isOpen={true}
        onOpenChange={onOpenChangeMock}
        onClose={onCloseMock}
      />,
    );
  
    fireEvent.input(screen.getByRole("textbox", { name: /link/i }), {
      target: {
        value: postMock.link,
      },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Share" }));
    });
  
    expect(logSpy).toBeCalledWith('sharing video');
  })
});
