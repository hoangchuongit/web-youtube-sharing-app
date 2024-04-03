export const getEmbedYoutubeLink = (link: string): string => {
  return link.replace('watch?v=', 'embed/');
};
