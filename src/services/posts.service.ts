import { config } from '@/constants/config';
import { apiClientBrowser } from './base.service';
import { Post, PostFilterParams } from '@/types/posts.type';

const postsApiPath = `${config.apiBaseUrl}/posts`;

export async function fetchPosts(filter?: PostFilterParams): Promise<Post[]> {
  try {
    const res = await apiClientBrowser.get(`${postsApiPath}`, {
      params: filter,
    });

    let result: Post[] = [];
    if (res?.data?.items) {
      result = res?.data.items;
    }
    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
}
