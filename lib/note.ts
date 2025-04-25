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

export const getMaxPossibleNote = (notes: ReturnType<typeof useNote>[]) =>
  Math.floor(
    notes.reduce((height, { note, octave }) => {
      return height + note + octave * 12;
    }, 12) / 12
  ) * 12;
