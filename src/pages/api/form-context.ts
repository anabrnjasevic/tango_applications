import type { APIRoute } from 'astro';
import { fetchGoogleFormContext } from '../../data/form';
import { getClientIp, rateLimit } from '../../lib/rate-limit';

export const prerender = false;

/** @deprecated Prefer POST /api/register which returns fbzx after validation. */
export const GET: APIRoute = async ({ request }) => {
  const ip = getClientIp(request);

  if (!rateLimit(`form-context:${ip}`, 20, 60_000)) {
    return Response.json({ ok: false, error: 'Too many requests.' }, { status: 429 });
  }

  const context = await fetchGoogleFormContext();
  return Response.json(context);
};
