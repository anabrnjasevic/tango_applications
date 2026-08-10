import type { APIRoute } from 'astro';
import { fetchGoogleFormContext } from '../../data/form';
import { validateAndSanitizeRegistration, verifyTurnstile } from '../../lib/form-security';
import { getClientIp, rateLimit } from '../../lib/rate-limit';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const ip = getClientIp(request);

  if (!rateLimit(`register:${ip}`, 8, 60_000)) {
    return Response.json(
      { ok: false, error: 'Too many attempts. Please wait a minute and try again.' },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const validation = validateAndSanitizeRegistration(body);
  if (!validation.ok) {
    return Response.json({ ok: false, error: validation.error }, { status: 400 });
  }

  // Silently accept honeypot submissions so bots do not learn the field name.
  if (validation.honeypot) {
    return Response.json({ ok: true, submit: false });
  }

  const turnstileToken =
    body && typeof body === 'object' && 'turnstileToken' in body
      ? String((body as Record<string, unknown>).turnstileToken)
      : '';

  const captchaOk = await verifyTurnstile(turnstileToken, ip);
  if (!captchaOk) {
    return Response.json(
      { ok: false, error: 'Security check failed. Please refresh and try again.' },
      { status: 403 },
    );
  }

  const context = await fetchGoogleFormContext();

  return Response.json({
    ok: true,
    submit: true,
    submission: validation.data,
    fbzx: context.fbzx,
  });
};
