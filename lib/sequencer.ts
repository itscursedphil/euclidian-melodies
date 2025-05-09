import useEuclidianPattern from "@/hooks/useEuclidianPattern";
import useNote from "@/hooks/useNote";
import { findNearestNoteInScale } from "@/lib/note";

export type SequencerPlaybackDirection = "forward" | "backward";

// TODO: write tests for this function
export const getSequence = (
  patterns: ReturnType<typeof useEuclidianPattern>[],
  notes: ReturnType<typeof useNote>[],
  scale: number[],
  index: number,
  root = 0,
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
    .map((step) => findNearestNoteInScale(step, scale) + root);
