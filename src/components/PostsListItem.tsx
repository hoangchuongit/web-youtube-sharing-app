import { Post } from '@/types/posts.type';
import React from 'react';
import { YoutubeIframe } from './YoutubeIframe';

type PostsListItemProps = {
  post: Post;
};

const PostsListItem = ({ post }: PostsListItemProps) => {
  const { title, link, description, user } = post;

  return (
    <div className="lg:p-2 my-10 flex flex-col lg:flex-row">
      <div className="rounded-sm">
        <YoutubeIframe link={link} />
      </div>
      <div className="px-2">
        <p className="text-red-monza text-lg lg:text-2xl">{title}</p>
        <p className="text-sm lg:text-md">Shared by: {user.fullName}</p>
        <p className="text-sm lg:text-md">Description:</p>
        <p className="max-h-32 text-xs overflow-clip overflow-hidden">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PostsListItem;
