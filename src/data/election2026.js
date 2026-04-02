import data from './election2026.json';

export const FRONTS      = data.fronts;
export const PARTY_META  = data.parties;

// Remap string keys ("1"…"140") to numbers so constituencies.id lookup works directly
export const candidates2026 = Object.fromEntries(
  Object.entries(data.candidates).map(([k, v]) => [Number(k), v])
);
