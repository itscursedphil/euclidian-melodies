import React from "react";

import useNote from "@/hooks/useNote";
import { getMaxPossibleNote, getNoteName } from "@/lib/note";
import { cn } from "@/lib/utils";

export type SequenceVisualizerProps = {
  sequence: number[];
  notes: ReturnType<typeof useNote>[];
  index?: number;
  root?: number;
  className?: string;
};

const getNoteScale = (note: number, octaves: number, root = 0) =>
  (1 / (octaves * 12)) * (note - root + 1);

const SequenceVisualizer: React.FC<SequenceVisualizerProps> = ({
  sequence,
  notes,
  index = 0,
  root = 0,
  className,
}) => {
  const noteHeight = 5;
  const maxNote = getMaxPossibleNote(notes);
  const sequenceHeight = maxNote * noteHeight;
  const totalOctaves = Math.floor(maxNote / 12);

  return (
    <div className={cn("relative", className)}>
      <div className="flex">
        {sequence.map((_, i) => (
          <div
            key={i}
            className={`w-full ${
              (i + index) % 16 === 0 ? "text-primary" : "text-secondary"
            }`}
          >
            {i + index + 1}
          </div>
        ))}
      </div>
      <div
        className="flex items-end relative w-full mt-2"
        style={{
          height: `${sequenceHeight}px`,
        }}
      >
        {Array(totalOctaves + 1)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="w-full h-[1px] absolute bg-secondary"
              style={{
                top: `${(sequenceHeight / totalOctaves) * i}px`,
              }}
            />
          ))}
        {sequence.map((n, i) => (
          <div
            key={i}
            className={`w-full mx-[2px] relative origin-bottom ${
              i === 0 ? "bg-primary" : "bg-secondary"
            }`}
            style={{
              height: `${sequenceHeight}px`,
              transform: `scaleY(${getNoteScale(n, totalOctaves, root)})`,
            }}
          />
        ))}
      </div>
      <div className="flex w-full mt-2">
        {sequence.map((n, i) => (
          <div
            key={i}
            className={`w-full ${i === 0 ? "text-primary" : "text-secondary"}`}
          >
            {getNoteName(n)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SequenceVisualizer;
