import React from "react";

import useNote from "@/hooks/useNote";
import { getNoteName } from "@/lib/melody";
import { cn } from "@/lib/utils";

const SequenceVisualizer: React.FC<{
  sequence: number[];
  notes: ReturnType<typeof useNote>[];
  index?: number;
  className?: string;
}> = ({ sequence, notes, index = 0, className }) => {
  const sequenceHeight =
    Math.floor(
      notes.reduce((height, { note, octave }) => {
        return height + note + octave * 12;
      }, 12) / 12
    ) *
    12 *
    5;
  const totalOctaves = Math.floor(sequenceHeight / 12 / 5);

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
              transform: `scaleY(${(1 / (totalOctaves * 12)) * (n + 1)})`,
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
