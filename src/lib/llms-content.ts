import {
  artists,
  djs,
  pricing,
  schedule,
  seo,
  site,
  siteUrl,
  testimonials,
  venue,
} from '../data/site';

function formatSchedule() {
  return schedule
    .map((item, index) => {
      const subtitle = 'subtitle' in item && item.subtitle ? `\n${item.subtitle}` : '';
      const details = item.details.map((detail) => `  ${detail}`).join('\n');
      return `${index + 1}. ${item.title}${subtitle}\n   ${item.time} · ${item.day} · ${item.tag}\n${details}`;
    })
    .join('\n\n');
}

function formatPricing() {
  return pricing.tiers
    .map((tier) => {
      const features = tier.features.map((feature) => `  - ${feature}`).join('\n');
      return `- **${tier.name}** (${tier.price})\n${features}`;
    })
    .join('\n\n');
}

function formatDjs() {
  return djs.map((dj) => `- ${dj.name} — ${dj.role}\n  ${dj.bio}`).join('\n');
}

function formatTestimonials() {
  return testimonials
    .map((item) => `- "${item.quote}" — ${item.name}, ${item.role}`)
    .join('\n');
}

export function buildLlmsTxt() {
  const registerUrl = `${siteUrl}${site.registerUrl}`;

  return `# ${site.title}

> ${seo.description}

## Event details
- Dates: ${site.date}
- Location: ${site.location}
- Address: ${site.address}
- Contact: ${site.contactEmail} · ${site.contactPhone}

## Artists
${artists.headline}

${artists.body}

Gala: ${artists.gala}

## Schedule
${formatSchedule()}

## Pricing
${pricing.headline} — ${pricing.deadline}

${formatPricing()}

## Registration
Register at: ${registerUrl}

## Optional
- Full plain-text page: ${siteUrl}/info.txt
`;
}

export function buildInfoTxt() {
  const registerUrl = `${siteUrl}${site.registerUrl}`;

  return `${site.title}
${site.tagline}

${seo.description}

EVENT DETAILS
=============
Dates: ${site.date}
Location: ${site.location}
Address: ${site.address}
Email: ${site.contactEmail}
Phone: ${site.contactPhone}
Website: ${siteUrl}

ARTISTS
=======
${artists.headline}

${artists.body}

${artists.gala}

DJs
===
${formatDjs()}

SCHEDULE
========
${formatSchedule()}

VENUE
=====
${venue.headline}

${venue.workshops.title}
${venue.workshops.body}

${venue.milongas.title}
${venue.milongas.body}

PRICING
=======
${pricing.headline}
${pricing.subheadline}
${pricing.deadline}

${pricing.tiers
  .map((tier) => {
    const features = tier.features.map((feature) => `  - ${feature}`).join('\n');
    return `${tier.name} — ${tier.price}\n${features}`;
  })
  .join('\n\n')}

TESTIMONIALS
============
${formatTestimonials()}

REGISTRATION
============
Register at: ${registerUrl}
`;
}
