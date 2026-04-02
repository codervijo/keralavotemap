import { constituencies } from './constituencies';

export function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function toConstituencySlug(name) {
  return `${toSlug(name)}-election-2026`;
}

// "dharmadom-election-2026" → constituency object
export const constituencyBySlug = Object.fromEntries(
  constituencies.map((c) => [toConstituencySlug(c.name), c])
);

// All 140 slugs — useful for sitemap generation
export const allConstituencySlugs = constituencies.map((c) =>
  toConstituencySlug(c.name)
);
