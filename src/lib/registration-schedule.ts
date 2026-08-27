import { addonChoices, individualTicketChoices, packageChoices } from '../data/form';
import { copy, pricing } from '../data/site';

const TIMEZONE = 'Europe/Belgrade';

/** Periods that accept online registration (Day of Event is door-only). */
const ONLINE_REGISTRATION_PERIOD_IDS = new Set(['super-early', 'early', 'regular']);

const MAIN_PERIOD_PACKAGE_NAMES = new Set(['Full Pass', 'Milonga Pass', 'Workshop Pass']);

const PACKAGE_FORM_VALUES: Record<string, string> = {
  'Full Pass': 'Full Pass: 3 Milongas + 4 Workshops',
  'Milonga Pass': 'Milonga Pass: 3 Milongas',
  'Workshop Pass': 'Workshop Pass: 4 Workshops',
  'Escenario Pass':
    'Masterclass: Escenario 1 & 2 (Masterclass registration is subject to approval.)',
};

export type PeriodStatus = 'upcoming' | 'active' | 'closed';

export type PeriodState = {
  id: string;
  name: string;
  status: PeriodStatus;
  canRegister: boolean;
  showStrikethrough: boolean;
  opensLabel: string | null;
};

export type FormPackageChoice = {
  value: string;
  label: string;
  price: string;
};

export type RegistrationState = {
  isRegistrationOpen: boolean;
  isBeforeOpen: boolean;
  isAfterOnlineClose: boolean;
  activePeriodId: string | null;
  activePeriodName: string | null;
  periods: PeriodState[];
  individualTicketsAvailable: boolean;
  opensAt: string | null;
  opensAtLabel: string;
  individualTicketsAvailableFromLabel: string;
  message: string;
  registrationClosedMessage: string;
  registrationNotOpenMessage: string;
  formPackages: FormPackageChoice[];
  formEscenario: FormPackageChoice | null;
  allowedPackageValues: string[];
  ctaHref: string;
  ctaLabel: string;
};

export const registrationOpensOn = '2026-08-28';

function resolveNow(asOf?: Date): Date {
  const override = import.meta.env.PUBLIC_REGISTRATION_NOW;
  if (typeof override === 'string' && override.trim()) {
    const parsed = new Date(`${override.trim()}T12:00:00`);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return asOf ?? new Date();
}

function getBelgradeDayNumber(date: Date): number {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = formatter.formatToParts(date);
  const year = Number(parts.find((part) => part.type === 'year')?.value);
  const month = Number(parts.find((part) => part.type === 'month')?.value);
  const day = Number(parts.find((part) => part.type === 'day')?.value);
  return year * 10_000 + month * 100 + day;
}

function isoToDayNumber(isoDate: string): number {
  const [year, month, day] = isoDate.split('-').map(Number);
  return year * 10_000 + month * 100 + day;
}

function formatDisplayDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`);
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day} ${year}`;
}

function formatShortDate(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

function getPeriodStatus(
  now: Date,
  startDate: string,
  endDate: string,
): PeriodStatus {
  const today = getBelgradeDayNumber(now);
  const start = isoToDayNumber(startDate);
  const end = isoToDayNumber(endDate);

  if (today < start) return 'upcoming';
  if (today > end) return 'closed';
  return 'active';
}

function getPeriodById(id: string) {
  return pricing.periods.find((period) => period.id === id);
}

function getRegularPeriodStart(): string {
  const regular = pricing.periods.find((period) => period.id === 'regular');
  return regular && 'startDate' in regular ? regular.startDate : '2026-09-08';
}

export function isIndividualTicketsAvailable(asOf?: Date): boolean {
  const now = resolveNow(asOf);
  const today = getBelgradeDayNumber(now);
  return today >= isoToDayNumber(getRegularPeriodStart());
}

function toFormChoice(
  periodName: string,
  pkg: { name: string; price: string },
  labels: { value: string; label: string }[],
): FormPackageChoice {
  const formValue = PACKAGE_FORM_VALUES[pkg.name] ?? pkg.name;
  const baseLabel = labels.find((choice) => choice.value === formValue)?.label ?? pkg.name;
  return {
    value: formValue,
    label: `${baseLabel} — ${pkg.price} (${periodName})`,
    price: pkg.price,
  };
}

export function getPackagesForPeriod(periodId: string): FormPackageChoice[] {
  const period = getPeriodById(periodId);
  if (!period) return [];

  return period.packages
    .filter((pkg) => MAIN_PERIOD_PACKAGE_NAMES.has(pkg.name))
    .map((pkg) => toFormChoice(period.name, pkg, [...packageChoices]));
}

export function getEscenarioForPeriod(periodId: string): FormPackageChoice | null {
  const period = getPeriodById(periodId);
  if (!period) return null;
  const pkg = period.packages.find((item) => item.name === 'Escenario Pass');
  if (!pkg) return null;
  return toFormChoice(period.name, pkg, [...addonChoices]);
}

export function getAllowedPackageValuesForPeriod(periodId: string): string[] {
  const packages = getPackagesForPeriod(periodId).map((pkg) => pkg.value);
  const escenario = getEscenarioForPeriod(periodId);
  const allowed = escenario ? [...packages, escenario.value] : [...packages];
  if (periodId === 'regular' || periodId === 'day-of') {
    return [...allowed, ...individualTicketChoices.map((option) => option.value)];
  }
  return allowed;
}

export function getDefaultPricingTab(asOf?: Date): string {
  const state = getRegistrationState(asOf);
  const active = state.periods.find((period) => period.status === 'active');
  if (active) return active.id;

  const upcoming = state.periods.find((period) => period.status === 'upcoming');
  if (upcoming) return upcoming.id;

  const closed = [...state.periods].reverse().find((period) => period.status === 'closed');
  return closed?.id ?? pricing.periods[0]?.id ?? 'super-early';
}

function buildRegistrationMessage(
  isBeforeOpen: boolean,
  isAfterOnlineClose: boolean,
  activePeriod: (typeof pricing.periods)[number] | undefined,
): string {
  if (isBeforeOpen) {
    return `Registration opens ${formatDisplayDate(registrationOpensOn)}.`;
  }
  if (isAfterOnlineClose) {
    return copy.registrationClosedOnline;
  }
  if (activePeriod && 'endDate' in activePeriod) {
    return `${activePeriod.name} prices — register before ${formatShortDate(activePeriod.endDate)}.`;
  }
  return pricing.subheadline;
}

export function getRegistrationState(asOf?: Date): RegistrationState {
  const now = resolveNow(asOf);
  const today = getBelgradeDayNumber(now);
  const opensDay = isoToDayNumber(registrationOpensOn);
  const isBeforeOpen = today < opensDay;

  const periodStates: PeriodState[] = pricing.periods.map((period) => {
    const startDate = 'startDate' in period ? period.startDate : registrationOpensOn;
    const endDate = 'endDate' in period ? period.endDate : startDate;
    const status = getPeriodStatus(now, startDate, endDate);
    const allowsOnline = ONLINE_REGISTRATION_PERIOD_IDS.has(period.id);

    return {
      id: period.id,
      name: period.name,
      status,
      canRegister: status === 'active' && allowsOnline,
      showStrikethrough: status === 'closed',
      opensLabel: status === 'upcoming' ? `Opens ${formatShortDate(startDate)}` : null,
    };
  });

  const activePeriodState = periodStates.find(
    (period) => period.status === 'active' && ONLINE_REGISTRATION_PERIOD_IDS.has(period.id),
  );
  const activePeriod = activePeriodState ? getPeriodById(activePeriodState.id) : undefined;

  const lastOnlinePeriod = pricing.periods.find((period) => period.id === 'regular');
  const lastOnlineEnd =
    lastOnlinePeriod && 'endDate' in lastOnlinePeriod ? lastOnlinePeriod.endDate : '2026-11-15';
  const isAfterOnlineClose = today > isoToDayNumber(lastOnlineEnd);

  const isRegistrationOpen = Boolean(activePeriodState) && !isBeforeOpen;
  const individualTicketsAvailable = isIndividualTicketsAvailable(now);

  const formPackages = activePeriodState
    ? getPackagesForPeriod(activePeriodState.id)
    : [];
  const formEscenario = activePeriodState
    ? getEscenarioForPeriod(activePeriodState.id)
    : null;

  const allowedPackageValues = activePeriodState
    ? getAllowedPackageValuesForPeriod(activePeriodState.id)
    : [];

  return {
    isRegistrationOpen,
    isBeforeOpen,
    isAfterOnlineClose,
    activePeriodId: activePeriodState?.id ?? null,
    activePeriodName: activePeriodState?.name ?? null,
    periods: periodStates,
    individualTicketsAvailable,
    opensAt: registrationOpensOn,
    opensAtLabel: formatDisplayDate(registrationOpensOn),
    individualTicketsAvailableFromLabel: formatDisplayDate(getRegularPeriodStart()),
    message: buildRegistrationMessage(isBeforeOpen, isAfterOnlineClose, activePeriod),
    registrationClosedMessage: copy.registrationClosedOnline,
    registrationNotOpenMessage: copy.registrationNotOpenYet.replace(
      '{date}',
      formatDisplayDate(registrationOpensOn),
    ),
    formPackages,
    formEscenario,
    allowedPackageValues,
    ctaHref: isRegistrationOpen ? '#register' : '#tickets',
    ctaLabel: isRegistrationOpen ? copy.heroCtaRegister : copy.viewPrices,
  };
}

export function getPeriodStateById(periodId: string, asOf?: Date): PeriodState | undefined {
  return getRegistrationState(asOf).periods.find((period) => period.id === periodId);
}
