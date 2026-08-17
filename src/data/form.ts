export const googleForm = {
  id: '1FAIpQLSfzMvFAMYQxFL1r_0FJsXtzmkr3028mXQemBejGbK-kFGdaYg',
  viewUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSfzMvFAMYQxFL1r_0FJsXtzmkr3028mXQemBejGbK-kFGdaYg/viewform',
  embedUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSfzMvFAMYQxFL1r_0FJsXtzmkr3028mXQemBejGbK-kFGdaYg/viewform?embedded=true',
  submitUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSfzMvFAMYQxFL1r_0FJsXtzmkr3028mXQemBejGbK-kFGdaYg/formResponse',
  /** Shown after a successful submission (matches Google Forms behaviour). */
  successMessage:
    'Your response has been recorded. A copy of your responses will be emailed to you.',
} as const;

/** Google Form entry IDs — submissions land in the same sheet & email as the original form. */
export const formEntries = {
  name: 'entry.2005620554',
  email: 'entry.1045781291',
  phone: 'entry.1166974658',
  location: 'entry.1957441464',
  dancingYears: 'entry.437248376',
  performed: 'entry.2087114376',
  instructor: 'entry.556365597',
  role: 'entry.339188363',
  packages: 'entry.1534823636',
  notes: 'entry.272150664',
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
  {
    value: 'In a couple with.......................................................',
    label: 'In a couple with…',
    needsPartner: true,
  },
] as const;

export const packageOptions = [
  { value: 'Full Pass: 4 Workshops & 3 Milongas', label: 'Full Pass: 4 Workshops & 3 Milongas', group: 'package' as const },
  { value: 'Milonga Pass: 3 Milongas', label: 'Milonga Pass: 3 Milongas', group: 'package' as const },
  { value: 'Workshop Pass: 4 Workshops', label: 'Workshop Pass: 4 Workshops', group: 'package' as const },
  {
    value: 'Masterclass Pass: Escenario 1 & 2 (not part of Full Pass — subject to approval)',
    label: 'Escenario Pass: Escenario 1 & 2 (not part of Full Pass — subject to approval)',
    group: 'package' as const,
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
export const individualTicketChoices = packageOptions.filter((option) => option.group === 'individual');

export const individualTicketGroups = individualTicketChoices.reduce<
  { category: string; choices: typeof individualTicketChoices[number][] }[]
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

export type GoogleFormContext = {
  fbzx: string | null;
};

export async function fetchGoogleFormContext(): Promise<GoogleFormContext> {
  try {
    const response = await fetch(googleForm.viewUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) return { fbzx: null };

    const html = await response.text();
    const match = html.match(/name="fbzx"\s+value="(-?\d+)"/);
    return { fbzx: match?.[1] ?? null };
  } catch {
    return { fbzx: null };
  }
}

export function buildGoogleFormBody(
  data: RegistrationPayload,
  context: GoogleFormContext = { fbzx: null },
): URLSearchParams {
  const body = new URLSearchParams();

  body.set(formEntries.name, data.name);
  body.set(formEntries.email, data.email);
  body.set(formEntries.phone, data.phone);
  body.set(formEntries.location, data.location);
  body.set(formEntries.dancingYears, data.dancingYears);
  body.set(formEntries.performed, data.performed);
  body.set(formEntries.instructor, data.instructor);
  body.set(formEntries.role, data.role);

  for (const pkg of data.packages) {
    body.append(formEntries.packages, pkg);
  }

  const notes: string[] = [];
  if (data.partnerName?.trim()) {
    notes.push(`Couple partner: ${data.partnerName.trim()}`);
  }
  if (data.notes?.trim()) {
    notes.push(data.notes.trim());
  }
  if (notes.length) {
    body.set(formEntries.notes, notes.join('\n\n'));
  }

  // Required by Google Forms for programmatic submissions.
  body.set('emailAddress', data.email);
  body.set('emailReceipt', 'true');
  body.set('fvv', '1');
  body.set('pageHistory', '0');
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
): { ok: true } | { ok: false; error: string } {
  const normalized = body.toLowerCase();

  if (SUCCESS_MARKERS.some((marker) => body.includes(marker))) {
    return { ok: true };
  }

  if (normalized.includes('recaptcha') || normalized.includes('captcha')) {
    return {
      ok: false,
      error:
        'This form requires CAPTCHA. Use the embedded Google Form below, or ask the form owner to disable “send responders a copy of their response”.',
    };
  }

  if (normalized.includes('required question') || normalized.includes('this field is required')) {
    return {
      ok: false,
      error: 'Google Form rejected a required field. Please check all answers and try again.',
    };
  }

  if (status === 200 || status === 302) {
    return { ok: true };
  }

  return {
    ok: false,
    error: `Google Form rejected the submission (HTTP ${status}).`,
  };
}
