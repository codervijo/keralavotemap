import { constituencies } from './constituencies';
import { candidates2026 } from './election2026';

// Merged: each constituency + its 2026 candidates
export const allConstituencies = constituencies.map((c) => ({
  ...c,
  candidates: candidates2026[c.id] ?? [],
}));
