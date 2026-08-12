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
  return pricing.periods
    .map((period) => {
      const packages = period.packages
        .map((tier) => `- **${tier.name}** (${tier.price}) — ${tier.description}`)
        .join('\n');
      const individuals =
        period.individuals.length > 0
          ? `\nIndividual tickets:\n${period.individuals
              .map(
                (group) =>
                  `- ${group.category} (${group.price}):\n${group.items.map((item) => `  - ${item}`).join('\n')}`,
              )
              .join('\n')}`
          : '';
      return `### ${period.name}\n${packages}${individuals}`;
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
${pricing.headline} — ${pricing.subheadline}

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
${venue.walkingNote}

${venue.locations
  .map(
    (location) =>
      `${location.title}\n${location.name}\n${location.address.join(', ')}\n${location.description}`,
  )
  .join('\n\n')}

PRICING
=======
${pricing.headline}
${pricing.subheadline}

${pricing.periods
  .map((period) => {
    const packages = period.packages
      .map((tier) => `${tier.name} — ${tier.price} (${tier.description})`)
      .join('\n');
    const individuals =
      period.individuals.length > 0
        ? `\nIndividual:\n${period.individuals
            .map(
              (group) =>
                `${group.category} — ${group.price}\n${group.items.map((item) => `- ${item}`).join('\n')}`,
            )
            .join('\n')}`
        : '';
    return `${period.name}\n${packages}${individuals}`;
  })
  .join('\n\n')}

${pricing.notes.map((note) => `- ${note.text}`).join('\n')}

TESTIMONIALS
============
${formatTestimonials()}

REGISTRATION
============
Register at: ${registerUrl}
`;
}
