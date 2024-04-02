import { config } from '@/constants/config';
import { apiClientBrowser } from './base.service';
import { FetchPostsResponse, Post, PostFilterParams } from '@/types/posts.type';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/constants/common';

const postsApiPath = `${config.apiBaseUrl}/posts`;

export async function fetchPosts(
  filter?: PostFilterParams,
): Promise<FetchPostsResponse> {
  try {
    const res = await apiClientBrowser.get(`${postsApiPath}`, {
      params: {
        page: filter?.page || DEFAULT_PAGE,
        perPage: filter?.perPage || DEFAULT_PER_PAGE,
      },
    });

    const hasMore = res?.data?.hasMore || false;
    let posts: Post[] = [];

    if (res?.data?.items) {
      posts = res?.data.items;
    }

    return {
      posts,
      hasMore,
    };
  } catch (err) {
    console.error(err);
    return {
      posts: [],
      hasMore: false,
    };
  }
}
