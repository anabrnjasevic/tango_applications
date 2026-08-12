import {
  dancingYearsOptions,
  individualTicketChoices,
  packageOptions,
  roleOptions,
  validPackageValues,
  yesNoOptions,
  type RegistrationPayload,
} from '../data/form';
import { isIndividualTicketsAvailable } from '../data/site';

export const fieldLimits = {
  name: 120,
  email: 254,
  phone: 30,
  location: 120,
  partnerName: 120,
  notes: 2000,
  maxPackages: packageOptions.length,
} as const;

export type RegistrationRequest = RegistrationPayload & {
  /** Cloudflare Turnstile response token */
  turnstileToken: string;
  /** Honeypot — must stay empty */
  website?: string;
};

type ValidationResult =
  | { ok: true; data: RegistrationPayload; honeypot: boolean }
  | { ok: false; error: string };

/** Neutralize Google Sheets formula injection in free-text fields. */
export function sanitizeSheetText(value: string): string {
  const trimmed = value.trim().replace(/\0/g, '');
  if (!trimmed) return trimmed;
  if (/^[=+\-@\t\r]/.test(trimmed)) {
    return `'${trimmed}`;
  }
  return trimmed;
}

function sanitizeEmail(value: string): string {
  return value.trim().toLowerCase().slice(0, fieldLimits.email);
}

function sanitizePhone(value: string): string {
  return value.trim().replace(/[^\d+\s().-]/g, '').slice(0, fieldLimits.phone);
}

export function validateAndSanitizeRegistration(input: unknown): ValidationResult {
  if (!input || typeof input !== 'object') {
    return { ok: false, error: 'Invalid request body.' };
  }

  const body = input as Record<string, unknown>;
  const honeypot = typeof body.website === 'string' && body.website.trim().length > 0;

  if (typeof body.turnstileToken !== 'string' || !body.turnstileToken.trim()) {
    return { ok: false, error: 'Please complete the security check.' };
  }

  if (typeof body.name !== 'string' || !body.name.trim()) {
    return { ok: false, error: 'Please enter your surname and name.' };
  }
  if (typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  if (typeof body.phone !== 'string' || !body.phone.trim()) {
    return { ok: false, error: 'Please enter your phone number.' };
  }
  if (typeof body.location !== 'string' || !body.location.trim()) {
    return { ok: false, error: 'Please enter your country and place.' };
  }
  if (!dancingYearsOptions.includes(body.dancingYears as (typeof dancingYearsOptions)[number])) {
    return { ok: false, error: 'Please choose how long you have been dancing.' };
  }
  if (!yesNoOptions.includes(body.performed as (typeof yesNoOptions)[number])) {
    return { ok: false, error: 'Please answer whether you have performed as a tango dancer.' };
  }
  if (!yesNoOptions.includes(body.instructor as (typeof yesNoOptions)[number])) {
    return { ok: false, error: 'Please answer whether you are a tango instructor.' };
  }
  if (typeof body.role !== 'string' || !roleOptions.some((option) => option.value === body.role)) {
    return { ok: false, error: 'Please choose how you apply.' };
  }
  if (!Array.isArray(body.packages) || body.packages.length === 0) {
    return { ok: false, error: 'Please choose at least one package.' };
  }
  if (body.packages.length > fieldLimits.maxPackages) {
    return { ok: false, error: 'Too many packages selected.' };
  }
  if (!body.packages.every((pkg) => typeof pkg === 'string' && validPackageValues.includes(pkg))) {
    return { ok: false, error: 'Invalid package selection.' };
  }

  const individualValues = new Set(individualTicketChoices.map((option) => option.value));
  const hasIndividualSelection = body.packages.some(
    (pkg) => typeof pkg === 'string' && individualValues.has(pkg),
  );
  if (hasIndividualSelection && !isIndividualTicketsAvailable()) {
    return { ok: false, error: 'Individual tickets are not available yet.' };
  }
  if (body.partnerName !== undefined && typeof body.partnerName !== 'string') {
    return { ok: false, error: 'Invalid partner name.' };
  }
  if (body.notes !== undefined && typeof body.notes !== 'string') {
    return { ok: false, error: 'Invalid notes.' };
  }

  const coupleOption = roleOptions.find((option) => option.needsPartner);
  const partnerName =
    typeof body.partnerName === 'string' ? sanitizeSheetText(body.partnerName) : '';
  if (body.role === coupleOption?.value && !partnerName) {
    return { ok: false, error: 'Please enter your partner\'s name.' };
  }

  const data: RegistrationPayload = {
    name: sanitizeSheetText(body.name).slice(0, fieldLimits.name),
    email: sanitizeEmail(body.email),
    phone: sanitizePhone(body.phone),
    location: sanitizeSheetText(body.location).slice(0, fieldLimits.location),
    dancingYears: body.dancingYears as (typeof dancingYearsOptions)[number],
    performed: body.performed as (typeof yesNoOptions)[number],
    instructor: body.instructor as (typeof yesNoOptions)[number],
    role: body.role,
    packages: body.packages as string[],
    ...(partnerName ? { partnerName: partnerName.slice(0, fieldLimits.partnerName) } : {}),
    ...(typeof body.notes === 'string' && body.notes.trim()
      ? { notes: sanitizeSheetText(body.notes).slice(0, fieldLimits.notes) }
      : {}),
  };

  if (!data.name || !data.phone || !data.location) {
    return { ok: false, error: 'Please fill in all required fields.' };
  }

  return { ok: true, data, honeypot };
}

export async function verifyTurnstile(token: string, remoteIp: string): Promise<boolean> {
  const secret =
    import.meta.env.TURNSTILE_SECRET_KEY ??
    (import.meta.env.DEV ? '1x0000000000000000000000000000000AA' : '');

  if (!secret) {
    console.error('[turnstile] TURNSTILE_SECRET_KEY is not configured.');
    return false;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        response: token,
        remoteip: remoteIp !== 'unknown' ? remoteIp : undefined,
      }),
    });

    const result = (await response.json()) as { success?: boolean };
    return Boolean(result.success);
  } catch (error) {
    console.error('[turnstile] Verification failed', error);
    return false;
  }
}
