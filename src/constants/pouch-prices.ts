import { PouchSize } from 'src/types/delivery';

export const POUCH_PRICES: Record<PouchSize, number> = {
  A: 55.5,
  B: 59.5,
  C: 62.75,
  D: 69.0,
  E: 71.25,
} as const;
