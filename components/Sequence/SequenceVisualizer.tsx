import React from "react";
import useNote from "@/hooks/useNote";
import { getNoteName } from "@/lib/melody";

const SequenceVisualizer: React.FC<{
  sequence: number[];
  notes: ReturnType<typeof useNote>[];
}> = ({ sequence, notes }) => {
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
    <div>
      <div
        className="flex items-end relative w-full"
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
      <div className="flex w-full">
        {sequence.map((n, i) => (
          <div key={i} className="w-full text-center">
            {getNoteName(n)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SequenceVisualizer;
