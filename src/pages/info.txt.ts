import type { APIRoute } from 'astro';
import { buildInfoTxt } from '../lib/llms-content';

export const GET: APIRoute = () => {
  return new Response(buildInfoTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
