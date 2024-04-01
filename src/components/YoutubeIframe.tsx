import useWindowSize from '@/hooks/useWindowSize';
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
      src={link.replace('watch?v=', 'embed/')}
      width={iframeWidth}
      height={iframeHeight}
    ></iframe>
  );
};
