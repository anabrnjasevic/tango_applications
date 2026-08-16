export const posterVariants = {
  social: {
    label: 'Social / desktop',
    description: 'Facebook, LinkedIn, WhatsApp — 1200×630',
    width: 1200,
    height: 630,
    dateClass: 'text-xs tracking-[0.35em] sm:text-sm',
    taglineClass: 'text-5xl leading-none sm:text-6xl',
    titleClass: 'text-2xl tracking-widest sm:text-3xl',
    titleGap: 'mt-3 sm:mt-4',
    bottomFadeClass: 'h-16',
    paddingClass: 'px-8',
  },
  story: {
    label: 'Mobile / Stories',
    description: 'Instagram & Facebook Stories — 1080×1920',
    width: 1080,
    height: 1920,
    dateClass: 'text-sm tracking-[0.35em]',
    taglineClass: 'text-7xl leading-none',
    titleClass: 'text-4xl tracking-widest',
    titleGap: 'mt-6',
    bottomFadeClass: 'h-32',
    paddingClass: 'px-10',
  },
  print: {
    label: 'Print (A4)',
    description: 'Flyers & posters — 2480×3508 @ 300 DPI',
    width: 2480,
    height: 3508,
    dateClass: 'text-3xl tracking-[0.35em]',
    taglineClass: 'text-[11rem] leading-none',
    titleClass: 'text-7xl tracking-widest',
    titleGap: 'mt-12',
    bottomFadeClass: 'h-48',
    paddingClass: 'px-24',
  },
} as const;

export type PosterVariant = keyof typeof posterVariants;

export function isPosterVariant(value: string): value is PosterVariant {
  return value in posterVariants;
}
