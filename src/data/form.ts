export const googleForm = {
  id: '1FAIpQLSfAhE6OsQgrGk3MkpnYeR5LrxdgGvNtnKcLj2tAaLjPPHCSSQ',
  viewUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSfAhE6OsQgrGk3MkpnYeR5LrxdgGvNtnKcLj2tAaLjPPHCSSQ/viewform',
  submitUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSfAhE6OsQgrGk3MkpnYeR5LrxdgGvNtnKcLj2tAaLjPPHCSSQ/formResponse',
  /** Shown after a successful submission (matches Google Forms behaviour). */
  successMessage:
    'Your response has been recorded. A copy of your responses will be emailed to you.',
} as const;

/**
 * Fallback Google Form entry IDs (live IDs are parsed from the form HTML on submit).
 * `addons` reuses the original checkbox question; `package` is filled after the update script.
 */
export const formEntries = {
  name: 'entry.1003458766',
  email: 'entry.457448918',
  phone: 'entry.208305133',
  location: 'entry.987735732',
  dancingYears: 'entry.537907525',
  performed: 'entry.2083154788',
  instructor: 'entry.1690969453',
  role: 'entry.613676606',
  partnerName: 'entry.1537751429',
  package: 'entry.253885768',
  addons: 'entry.172273152',
  notes: 'entry.985936245',
} as const;

export const dancingYearsOptions = [
  'less than a year',
  '1-3 years',
  '3-5 years',
  '5-10 years',
  '10 + years',
] as const;

export const yesNoOptions = ['Yes', 'No'] as const;

export const roleOptions = [
  { value: 'Leader', label: 'Leader' },
  { value: 'Follower', label: 'Follower' },
  { value: 'Both leader and follower', label: 'Both leader and follower' },
  { value: 'In a couple', label: 'In a couple', needsPartner: true },
] as const;

export const mainPackageValues = [
  'Full Pass: 3 Milongas + 4 Workshops',
  'Milonga Pass: 3 Milongas',
  'Workshop Pass: 4 Workshops',
] as const;

export const escenarioValue =
  'Masterclass: Escenario 1 & 2 (Masterclass registration is subject to approval.)';

export const googleFormAddonValues = [
  escenarioValue,
  'Individual Milonga: Friday Welcome Milonga',
  'Individual Milonga: Saturday Milonga',
  'Individual Milonga: Sunday Gala Milonga and Show',
  'Individual Workshop: Key Knowledge',
  'Individual Workshop: Tango Vals',
  'Individual Workshop: Complex Salon Sequences',
  'Individual Workshop: Milonga',
  'Individual Masterclass: Escenario 1: Introductory',
  'Individual Masterclass: Escenario 2: Stage elements',
] as const;

export const packageOptions = [
  {
    value: 'Full Pass: 3 Milongas + 4 Workshops',
    label: 'Full Pass: 4 Workshops & 3 Milongas',
    group: 'package' as const,
  },
  { value: 'Milonga Pass: 3 Milongas', label: 'Milonga Pass: 3 Milongas', group: 'package' as const },
  { value: 'Workshop Pass: 4 Workshops', label: 'Workshop Pass: 4 Workshops', group: 'package' as const },
  {
    value: escenarioValue,
    label: 'Escenario Pass: Escenario 1 & 2 (not part of Full Pass — subject to approval)',
    group: 'addon' as const,
  },
  { value: 'Individual Milonga: Friday Welcome Milonga', label: 'Friday Welcome Milonga — SPENS', group: 'individual' as const, category: 'Individual Milonga' },
  { value: 'Individual Milonga: Saturday Milonga', label: 'Saturday Milonga — SPENS', group: 'individual' as const, category: 'Individual Milonga' },
  {
    value: 'Individual Milonga: Sunday Gala Milonga and Show',
    label: 'Sunday Gala Milonga and Show — RTV (max. 100)',
    group: 'individual' as const,
    category: 'Individual Milonga',
  },
  { value: 'Individual Workshop: Key Knowledge', label: 'Key Knowledge', group: 'individual' as const, category: 'Individual Workshops' },
  { value: 'Individual Workshop: Tango Vals', label: 'Tango Vals', group: 'individual' as const, category: 'Individual Workshops' },
  {
    value: 'Individual Workshop: Complex Salon Sequences',
    label: 'Complex Salon Sequences',
    group: 'individual' as const,
    category: 'Individual Workshops',
  },
  { value: 'Individual Workshop: Milonga', label: 'Milonga', group: 'individual' as const, category: 'Individual Workshops' },
  {
    value: 'Individual Masterclass: Escenario 1: Introductory',
    label: 'Escenario 1: Introductory',
    group: 'individual' as const,
    category: 'Individual Masterclasses',
  },
  {
    value: 'Individual Masterclass: Escenario 2: Stage elements',
    label: 'Escenario 2: Stage elements',
    group: 'individual' as const,
    category: 'Individual Masterclasses',
  },
] as const;

export type PackageOption = (typeof packageOptions)[number];

export const validPackageValues = packageOptions.map((option) => option.value);

export const packageChoices = packageOptions.filter((option) => option.group === 'package');
export const addonChoices = packageOptions.filter((option) => option.group === 'addon');
export const individualTicketChoices = packageOptions.filter((option) => option.group === 'individual');

const mainPackageSet = new Set<string>(mainPackageValues);
const addonPackageSet = new Set<string>(googleFormAddonValues);

export function isMainPackageValue(value: string): boolean {
  return mainPackageSet.has(value);
}

export function isAddonPackageValue(value: string): boolean {
  return addonPackageSet.has(value);
}

export const individualTicketGroups = individualTicketChoices.reduce<
  { category: string; choices: (typeof individualTicketChoices)[number][] }[]
>((groups, option) => {
  const category = option.category;
  const existing = groups.find((group) => group.category === category);
  if (existing) {
    existing.choices.push(option);
  } else {
    groups.push({ category, choices: [option] });
  }
  return groups;
}, []);

export type RegistrationPayload = {
  name: string;
  email: string;
  phone: string;
  location: string;
  dancingYears: (typeof dancingYearsOptions)[number];
  performed: (typeof yesNoOptions)[number];
  instructor: (typeof yesNoOptions)[number];
  role: string;
  partnerName?: string;
  packages: string[];
  notes?: string;
};

export type GoogleFormEntries = {
  name: string;
  email: string;
  phone: string;
  location: string;
  dancingYears: string;
  performed: string;
  instructor: string;
  role: string;
  partnerName: string;
  package: string;
  addons: string;
  notes: string;
};

export type GoogleFormContext = {
  fbzx: string | null;
  entries: GoogleFormEntries;
  pageHistory: string;
};

const QUESTION_TITLE_TO_ENTRY: Record<string, keyof GoogleFormEntries> = {
  Name: 'name',
  Email: 'email',
  'Phone number': 'phone',
  'Country and place': 'location',
  'How long have you been dancing?': 'dancingYears',
  'Have you performed as a tango dancer?': 'performed',
  'Are you a tango instructor?': 'instructor',
  'I apply as:': 'role',
  "Partner's surname and name": 'partnerName',
  'Choose your package': 'package',
  'Add-ons': 'addons',
  'What are you registering for?': 'addons',
  'Anything you want to share?': 'notes',
};

function fallbackEntries(): GoogleFormEntries {
  return {
    name: formEntries.name,
    email: formEntries.email,
    phone: formEntries.phone,
    location: formEntries.location,
    dancingYears: formEntries.dancingYears,
    performed: formEntries.performed,
    instructor: formEntries.instructor,
    role: formEntries.role,
    partnerName: formEntries.partnerName,
    package: formEntries.package,
    addons: formEntries.addons,
    notes: formEntries.notes,
  };
}

export function parseGoogleFormHtml(html: string): Pick<GoogleFormContext, 'fbzx' | 'entries' | 'pageHistory'> {
  const fbzx = html.match(/name="fbzx"\s+value="(-?\d+)"/)?.[1] ?? null;
  const entries = fallbackEntries();
  let pageBreaks = 0;

  const dataMatch = html.match(/var FB_PUBLIC_LOAD_DATA_ = ([\s\S]*?);<\/script>/);
  if (dataMatch) {
    try {
      const data = JSON.parse(dataMatch[1]) as unknown;
      const questions = (data as [unknown, [unknown, unknown[]]])[1]?.[1] ?? [];
      for (const question of questions) {
        if (!Array.isArray(question)) continue;
        const title = question[1];
        const type = question[3];
        if (type === 8) pageBreaks += 1;
        if (typeof title !== 'string') continue;
        const key = QUESTION_TITLE_TO_ENTRY[title];
        const entryId = Array.isArray(question[4]) && Array.isArray(question[4][0]) ? question[4][0][0] : null;
        if (key && (typeof entryId === 'number' || typeof entryId === 'string')) {
          entries[key] = `entry.${entryId}`;
        }
      }
    } catch {
      // Keep hardcoded fallbacks if Google changes the payload shape.
    }
  }

  const pageIndexes = Array.from({ length: pageBreaks + 1 }, (_, index) => String(index));
  return { fbzx, entries, pageHistory: pageIndexes.join(',') };
}

const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
};

function collectCookies(response: Response): string {
  const pairs =
    typeof response.headers.getSetCookie === 'function'
      ? response.headers.getSetCookie()
      : [response.headers.get('set-cookie') ?? ''];

  return pairs
    .flatMap((header) => header.split(/,(?=\s*[^;=]+?=)/))
    .map((cookie) => cookie.split(';')[0]?.trim())
    .filter(Boolean)
    .join('; ');
}

type GoogleFormSession = GoogleFormContext & { cookies: string };

async function fetchGoogleFormSession(): Promise<GoogleFormSession> {
  const fallback: GoogleFormSession = {
    fbzx: null,
    entries: fallbackEntries(),
    pageHistory: '0,1,2',
    cookies: '',
  };

  try {
    const response = await fetch(googleForm.viewUrl, { headers: BROWSER_HEADERS });
    if (!response.ok) return fallback;
    const cookies = collectCookies(response);
    return { ...parseGoogleFormHtml(await response.text()), cookies };
  } catch {
    return fallback;
  }
}

export async function fetchGoogleFormContext(): Promise<GoogleFormContext> {
  const { cookies: _cookies, ...context } = await fetchGoogleFormSession();
  return context;
}

export function buildGoogleFormBody(
  data: RegistrationPayload,
  context: GoogleFormContext,
): URLSearchParams {
  const body = new URLSearchParams();
  const { entries } = context;

  body.set(entries.name, data.name);
  body.set(entries.email, data.email);
  body.set(entries.phone, data.phone);
  body.set(entries.location, data.location);
  body.set(entries.dancingYears, data.dancingYears);
  body.set(entries.performed, data.performed);
  body.set(entries.instructor, data.instructor);
  body.set(entries.role, data.role);

  if (data.partnerName?.trim() && entries.partnerName) {
    body.set(entries.partnerName, data.partnerName.trim());
  }

  const mainPackages = data.packages.filter(isMainPackageValue);
  const addons = data.packages.filter(isAddonPackageValue);

  if (entries.package && mainPackages[0]) {
    body.set(entries.package, mainPackages[0]);
  }

  if (entries.addons) {
    const addonValues = entries.package ? addons : data.packages;
    for (const value of addonValues) {
      body.append(entries.addons, value);
    }
  }

  if (data.notes?.trim() && entries.notes) {
    body.set(entries.notes, data.notes.trim());
  }

  body.set('emailAddress', data.email);
  body.set('emailReceipt', 'true');
  body.set('fvv', '1');
  body.set('pageHistory', context.pageHistory);
  if (context.fbzx) {
    body.set('fbzx', context.fbzx);
  }

  return body;
}

const SUCCESS_MARKERS = [
  'Your response has been recorded',
  'response has been recorded',
  'Odgovor je zabeležen',
  'Odgovor je snimljen',
];

export function parseGoogleFormResponse(
  status: number,
  body: string,
  location = '',
): { ok: true } | { ok: false; error: string } {
  const visible = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  const normalized = visible.toLowerCase();
  const loc = location.toLowerCase();

  if (
    /form_confirm|closedform/.test(loc) ||
    visible.includes('freebirdFormviewerViewResponseConfirmationMessage') ||
    SUCCESS_MARKERS.some((marker) => visible.includes(marker))
  ) {
    return { ok: true };
  }

  if (normalized.includes('recaptcha') || normalized.includes('captcha')) {
    return {
      ok: false,
      error: 'This form requires CAPTCHA. Ask the form owner to turn CAPTCHA off.',
    };
  }

  if (normalized.includes('required question') || normalized.includes('this field is required')) {
    return {
      ok: false,
      error: 'Google Form rejected a required field. Please check all answers and try again.',
    };
  }

  if (
    loc.includes('accounts.google') ||
    normalized.includes('sign in') ||
    normalized.includes('accounts.google') ||
    normalized.includes('to continue to google forms')
  ) {
    return {
      ok: false,
      error:
        'Google Form asked for a sign-in. In form settings, collect email as responder input — do not require a Google account.',
    };
  }

  return {
    ok: false,
    error: `Google Form rejected the submission (HTTP ${status}).`,
  };
}

export async function submitRegistrationToGoogle(
  data: RegistrationPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const session = await fetchGoogleFormSession();
    const body = buildGoogleFormBody(data, session);
    const headers: Record<string, string> = {
      ...BROWSER_HEADERS,
      'Content-Type': 'application/x-www-form-urlencoded',
      Origin: 'https://docs.google.com',
      Referer: googleForm.viewUrl,
    };
    if (session.cookies) headers.Cookie = session.cookies;

    const response = await fetch(googleForm.submitUrl, {
      method: 'POST',
      headers,
      body,
      redirect: 'manual',
    });

    const location = response.headers.get('location');
    if (location && /accounts\.google/i.test(location)) {
      return {
        ok: false,
        error:
          'Google Form asked for a sign-in. In form settings, collect email as responder input — do not require a Google account.',
      };
    }

    let html = '';
    let status = response.status;

    if (location && status >= 300 && status < 400) {
      const next = new URL(location, googleForm.submitUrl);
      const follow = await fetch(next, {
        headers: {
          ...BROWSER_HEADERS,
          ...(session.cookies ? { Cookie: session.cookies } : {}),
          Referer: googleForm.submitUrl,
        },
        redirect: 'follow',
      });
      status = follow.status;
      html = await follow.text();
    } else {
      html = await response.text();
    }

    const parsed = parseGoogleFormResponse(status, html, location ?? '');
    if (!parsed.ok) {
      console.error(
        '[google-form] submit failed',
        status,
        location ?? '(no location)',
        html.slice(0, 500),
      );
    }
    return parsed;
  } catch (error) {
    console.error('[google-form] submit threw', error);
    return { ok: false, error: 'Could not reach Google Forms. Please try again.' };
  }
}
