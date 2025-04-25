export const baseScales = {
  Chromatic: {
    intervals: "H-H-H-H-H-H-H-H-H-H-H-H",
    notes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  "Major (Ionian)": {
    intervals: "W-W-H-W-W-W-H",
    notes: [0, 2, 4, 5, 7, 9, 11],
  },
  "Natural Minor (Aeolian)": {
    intervals: "W-H-W-W-H-W-W",
    notes: [0, 2, 3, 5, 7, 8, 10],
  },
  "Major Pentatonic": {
    intervals: "W-W-3H-W-3H",
    notes: [0, 2, 4, 7, 9],
  },
  "Minor Pentatonic": {
    intervals: "3H-W-W-3H-W",
    notes: [0, 3, 5, 7, 10],
  },
  "Blues scale": {
    intervals: "3H-W-H-H-3H-W",
    notes: [0, 3, 5, 6, 7, 10],
  },
  "Blues Major": {
    intervals: "W-3H-W-W-3H",
    notes: [0, 2, 5, 7, 9],
  },
  "Blues minor": {
    intervals: "3H-W-3H-W-W",
    notes: [0, 3, 5, 8, 10],
  },
  "Melodic Minor (asc)": {
    intervals: "W-H-W-W-W-W-H",
    notes: [0, 2, 3, 5, 7, 9, 11],
  },
  "Harmonic Minor": {
    intervals: "W-H-W-W-H-3H-H",
    notes: [0, 2, 3, 5, 7, 8, 11],
  },
};

// Church Modes / Common Modal Scales
export const modalScales = {
  Dorian: {
    intervals: "W-H-W-W-W-H-W",
    notes: [0, 2, 3, 5, 7, 9, 10],
  },
  Phrygian: {
    intervals: "H-W-W-W-H-W-W",
    notes: [0, 1, 3, 5, 7, 8, 10],
  },
  Lydian: {
    intervals: "W-W-W-H-W-W-H",
    notes: [0, 2, 4, 6, 7, 9, 11],
  },
  Mixolydian: {
    intervals: "W-W-H-W-W-H-W",
    notes: [0, 2, 4, 5, 7, 9, 10],
  },
  Locrian: {
    intervals: "H-W-W-H-W-W-W",
    notes: [0, 1, 3, 5, 6, 8, 10],
  },
};

// Altered & Jazz Scales
export const alteredScales = {
  "Altered scale / Super Locrian": {
    intervals: "H-W-H-W-W-W-W",
    notes: [0, 1, 3, 4, 6, 8, 10],
  },
  "Half diminished scale": {
    intervals: "W-H-W-H-W-W-W",
    notes: [0, 2, 3, 5, 6, 8, 10],
  },
  "Harmonic Major": {
    intervals: "W-W-H-W-H-3H-H",
    notes: [0, 2, 4, 5, 7, 8, 11],
  },
  "Lydian augmented scale": {
    intervals: "W-W-W-W-H-W-H",
    notes: [0, 2, 4, 6, 8, 9, 11],
  },
  "Acoustic scale": {
    intervals: "W-W-W-H-W-H-W",
    notes: [0, 2, 4, 6, 7, 9, 10],
  },
};

// Folk, Eastern, and non-Western traditions
export const traditionalScales = {
  "Hungarian Minor": {
    intervals: "W-H-3H-H-H-3H-H",
    notes: [0, 2, 3, 6, 7, 8, 11],
  },
  "Hungarian Major": {
    intervals: "3H-H-W-H-W-H-W",
    notes: [0, 3, 4, 6, 7, 9, 10],
  },
  "Phrygian Dominant": {
    intervals: "H-3H-H-W-H-W-W",
    notes: [0, 1, 4, 5, 7, 8, 10],
  },
  "Double harmonic scale": {
    intervals: "H-3H-H-W-H-3H-H",
    notes: [0, 1, 4, 5, 7, 8, 11],
  },
  Persian: {
    intervals: "H-3H-H-H-W-3H-H",
    notes: [0, 1, 4, 5, 6, 8, 11],
  },
  "Neapolitan Minor": {
    intervals: "H-W-W-W-H-3H-H",
    notes: [0, 1, 3, 5, 7, 8, 11],
  },
  "Neapolitan Major": {
    intervals: "H-W-W-W-W-W-H",
    notes: [0, 1, 3, 5, 7, 9, 11],
  },
  "Ukrainian Dorian scale": {
    intervals: "W-H-3H-H-W-H-W",
    notes: [0, 2, 3, 6, 7, 9, 10],
  },
  '"Gypsy" scale': {
    intervals: "W-H-3H-H-H-W-W",
    notes: [0, 2, 3, 6, 7, 8, 10],
  },
};

// Traditional pentatonic-ish scales with characteristic colors
export const japaneseScales = {
  Hirajoshi: {
    intervals: "2W-W-H-2W-H",
    notes: [0, 4, 6, 7, 11],
  },
  Yo: {
    intervals: "3H-W-W-3H-W",
    notes: [0, 3, 5, 7, 10],
  },
  In: {
    intervals: "H-2W-W-H-2W",
    notes: [0, 1, 5, 7, 8],
  },
  Insen: {
    intervals: "H-2W-W-3H-W",
    notes: [0, 1, 5, 7, 10],
  },
  Iwato: {
    intervals: "H-2W-H-2W-W",
    notes: [0, 1, 5, 6, 10],
  },
};

// Rare, exotic, or constructed for modern or avant-garde composition
export const experimentalScales = {
  "Whole Tone": {
    intervals: "W-W-W-W-W-W",
    notes: [0, 2, 4, 6, 8, 10],
  },
  Tritone: {
    intervals: "H-3H-W-H-3H-W",
    notes: [0, 1, 4, 6, 7, 10],
  },
  Augmented: {
    intervals: "3H-H-3H-H-3H-H",
    notes: [0, 3, 4, 7, 8, 11],
  },
  "Prometheus scale": {
    intervals: "W-W-W-3H-H-W",
    notes: [0, 2, 4, 6, 9, 10],
  },
  "Enigmatic scale": {
    intervals: "H-3H-W-W-W-H-H",
    notes: [0, 1, 4, 6, 8, 10, 11],
  },
  "Egyptian Suspended": {
    intervals: "W-3H-W-3H-W",
    notes: [0, 2, 5, 7, 10],
  },
  "Major Locrian": {
    intervals: "W-W-H-H-W-W-W",
    notes: [0, 2, 4, 5, 6, 8, 10],
  },
};

export const scales = {
  ...baseScales,
  ...modalScales,
  ...traditionalScales,
  ...japaneseScales,
  ...alteredScales,
  ...experimentalScales,
};

export type ScaleName = keyof typeof scales;
