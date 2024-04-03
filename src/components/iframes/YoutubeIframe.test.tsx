import { fireEvent, render, screen } from '@testing-library/react';
import { YoutubeIframe } from './YoutubeIframe';
import { shareLinkMock } from '@/__mocks__/posts.mock';
import { YOUTUBE_IFRAME_TITLE } from '@/constants/testing';
import { getEmbedYoutubeLink } from '@/shared/helpers';

describe('YoutubeIframe', () => {
  it('should render youtube iframe correctly', () => {
    render(<YoutubeIframe link={shareLinkMock} />);
    const iframe = screen.getByTitle(YOUTUBE_IFRAME_TITLE);
    expect(iframe).toHaveAttribute('src', getEmbedYoutubeLink(shareLinkMock));
  });
});
