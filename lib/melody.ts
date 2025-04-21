import useEuclidianPattern from "@/hooks/useEuclidianPattern";
import useNote from "@/hooks/useNote";

export const noteNames = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const scales = {
  Chromatic: {
    intervals: "H-H-H-H-H-H-H-H-H-H-H-H",
    notes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  "Altered scale / Super Locrian scale": {
    intervals: "H-W-H-W-W-W-W",
    notes: [0, 1, 3, 4, 6, 8, 10],
  },
  Locrian: {
    intervals: "H-W-W-H-W-W-W",
    notes: [0, 1, 3, 5, 6, 8, 10],
  },
  Phrygian: {
    intervals: "H-W-W-W-H-W-W",
    notes: [0, 1, 3, 5, 7, 8, 10],
  },
  "Neapolitan minor scale": {
    intervals: "H-W-W-W-H-3H-H",
    notes: [0, 1, 3, 5, 7, 8, 11],
  },
  "Neapolitan major scale": {
    intervals: "H-W-W-W-W-W-H",
    notes: [0, 1, 3, 5, 7, 9, 11],
  },
  "Persian scale": {
    intervals: "H-3H-H-H-W-3H-H",
    notes: [0, 1, 4, 5, 6, 8, 11],
  },
  "Phrygian dominant scale": {
    intervals: "H-3H-H-W-H-W-W",
    notes: [0, 1, 4, 5, 7, 8, 10],
  },
  "Double harmonic scale": {
    intervals: "H-3H-H-W-H-3H-H",
    notes: [0, 1, 4, 5, 7, 8, 11],
  },
  "Tritone scale": {
    intervals: "H-3H-W-H-3H-W",
    notes: [0, 1, 4, 6, 7, 10],
  },
  "Enigmatic scale": {
    intervals: "H-3H-W-W-W-H-H",
    notes: [0, 1, 4, 6, 8, 10, 11],
  },
  "Iwato scale": {
    intervals: "H-2W-H-2W-W",
    notes: [0, 1, 5, 6, 10],
  },
  "In scale": {
    intervals: "H-2W-W-H-2W",
    notes: [0, 1, 5, 7, 8],
  },
  "Insen scale": {
    intervals: "H-2W-W-3H-W",
    notes: [0, 1, 5, 7, 10],
  },
  "Half diminished scale": {
    intervals: "W-H-W-H-W-W-W",
    notes: [0, 2, 3, 5, 6, 8, 10],
  },
  "Aeolian / Natural Minor": {
    intervals: "W-H-W-W-H-W-W",
    notes: [0, 2, 3, 5, 7, 8, 10],
  },
  "Harmonic Minor": {
    intervals: "W-H-W-W-H-3H-H",
    notes: [0, 2, 3, 5, 7, 8, 11],
  },
  Dorian: {
    intervals: "W-H-W-W-W-H-W",
    notes: [0, 2, 3, 5, 7, 9, 10],
  },
  "Melodic Minor (asc)": {
    intervals: "W-H-W-W-W-W-H",
    notes: [0, 2, 3, 5, 7, 9, 11],
  },
  '"Gypsy" scale': {
    intervals: "W-H-3H-H-H-W-W",
    notes: [0, 2, 3, 6, 7, 8, 10],
  },
  "Hungarian minor scale": {
    intervals: "W-H-3H-H-H-3H-H",
    notes: [0, 2, 3, 6, 7, 8, 11],
  },
  "Ukrainian Dorian scale": {
    intervals: "W-H-3H-H-W-H-W",
    notes: [0, 2, 3, 6, 7, 9, 10],
  },
  "Major Locrian scale": {
    intervals: "W-W-H-H-W-W-W",
    notes: [0, 2, 4, 5, 6, 8, 10],
  },
  "Harmonic major scale": {
    intervals: "W-W-H-W-H-3H-H",
    notes: [0, 2, 4, 5, 7, 8, 11],
  },
  Mixolydian: {
    intervals: "W-W-H-W-W-H-W",
    notes: [0, 2, 4, 5, 7, 9, 10],
  },
  "Ionian / Major": {
    intervals: "W-W-H-W-W-W-H",
    notes: [0, 2, 4, 5, 7, 9, 11],
  },
  "Acoustic scale": {
    intervals: "W-W-W-H-W-H-W",
    notes: [0, 2, 4, 6, 7, 9, 10],
  },
  Lydian: {
    intervals: "W-W-W-H-W-W-H",
    notes: [0, 2, 4, 6, 7, 9, 11],
  },
  "Lydian augmented scale": {
    intervals: "W-W-W-W-H-W-H",
    notes: [0, 2, 4, 6, 8, 9, 11],
  },
  "Whole tone": {
    intervals: "W-W-W-W-W-W",
    notes: [0, 2, 4, 6, 8, 10],
  },
  "Prometheus scale": {
    intervals: "W-W-W-3H-H-W",
    notes: [0, 2, 4, 6, 9, 10],
  },
  "Major pentatonic": {
    intervals: "W-W-3H-W-3H",
    notes: [0, 2, 4, 7, 9],
  },
  "Blues major": {
    intervals: "W-3H-W-W-3H",
    notes: [0, 2, 5, 7, 9],
  },
  "Egyptian, suspended": {
    intervals: "W-3H-W-3H-W",
    notes: [0, 2, 5, 7, 10],
  },
  "Hungarian major scale": {
    intervals: "3H-H-W-H-W-H-W",
    notes: [0, 3, 4, 6, 7, 9, 10],
  },
  "Augmented scale": {
    intervals: "3H-H-3H-H-3H-H",
    notes: [0, 3, 4, 7, 8, 11],
  },
  "Blues scale": {
    intervals: "3H-W-H-H-3H-W",
    notes: [0, 3, 5, 6, 7, 10],
  },
  "Minor pentatonic": {
    intervals: "3H-W-W-3H-W",
    notes: [0, 3, 5, 7, 10],
  },
  "Yo scale": {
    intervals: "3H-W-W-3H-W",
    notes: [0, 3, 5, 7, 10],
  },
  "Blues minor": {
    intervals: "3H-W-3H-W-W",
    notes: [0, 3, 5, 8, 10],
  },
  "Hirajoshi scale": {
    intervals: "2W-W-H-2W-H",
    notes: [0, 4, 6, 7, 11],
  },
};

export const getNoteName = (note: number) => noteNames[note % 12];

// TODO: write tests for this function
export const findNearestNoteInScale = (
  note: number,
  notesInScale: number[]
) => {
  const octave = Math.floor(note / 12);
  const noteInOctave = note % 12;
  const noteInScale = notesInScale.find((n) => n === noteInOctave);

  if (noteInScale !== undefined) {
    return noteInScale + octave * 12;
  }

  const distances = notesInScale.map((n) => Math.abs(n - noteInOctave));
  const minDistance = Math.min(...distances);
  const nearestNoteIndex = distances.indexOf(minDistance);

  return notesInScale[nearestNoteIndex] + octave * 12;
};

export const getSequence = (
  patterns: ReturnType<typeof useEuclidianPattern>[],
  notes: ReturnType<typeof useNote>[],
  scale: number[],
  index: number,
  length = 16
) =>
  Array(length)
    .fill(0)
    .map((_, i) =>
      patterns
        .map(({ patternWithRotation }, j) => {
          const { note, octave } = notes[j];

          const trig =
            patternWithRotation[(i + index) % patternWithRotation.length];

          return trig ? note + octave * 12 : 0;
        })
        .reduce((acc, step) => acc + step, 0)
    )
    .map((step) => findNearestNoteInScale(step, scale));
