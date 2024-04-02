export interface PostUser {
  id: string;
  fullName: string;
}

export interface Post {
  id: string;
  title: string;
  link: string;
  description?: string;
  like?: string[];
  unlike?: string[];
  user: PostUser;
}

export interface PostFilterParams {
  page: number;
  perPage: number;
}

export interface FetchPostsResponse {
  posts: Post[];
  hasMore: boolean;
}
