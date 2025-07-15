import posts from '$lib/Posts';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
  const slug = params.slug;
  const post = posts.find(p => p.slug === slug);
  
  if (!post) {
    return {
      status: 404,
      error: new Error('Post not found')
    };
  }
  
  return {
    post
  };
}) satisfies PageLoad;
