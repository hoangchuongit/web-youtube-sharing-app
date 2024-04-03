import { renderHook } from '@testing-library/react';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/constants/common';
import usePosts from './usePosts';

describe('usePosts', () => {
  it('should render the custom hooks', () => {
    const { result } = renderHook(() =>
      usePosts({ page: DEFAULT_PAGE, perPage: DEFAULT_PER_PAGE }),
    );
    expect(result.current.hasListMore).toBe(false);
  });
});
