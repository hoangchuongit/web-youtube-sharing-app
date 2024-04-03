import { YOUTUBE_IFRAME_TITLE } from '@/constants/testing';
import useWindowSize from '@/hooks/useWindowSize';
import { getEmbedYoutubeLink } from '@/shared/helpers';
import React from 'react';

type YoutubeIframeProps = {
  link: string;
};

export const YoutubeIframe = ({ link }: YoutubeIframeProps) => {
  const size = useWindowSize();

  let iframeHeight = '250';
  let iframeWidth = '450';

  if (size?.width < 1000) {
    iframeWidth = '100%';
    iframeHeight = '225';
  }

  return (
    <iframe
      title={YOUTUBE_IFRAME_TITLE}
      src={getEmbedYoutubeLink(link)}
      width={iframeWidth}
      height={iframeHeight}
    ></iframe>
  );
};
