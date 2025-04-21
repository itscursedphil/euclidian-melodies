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
        style={{
          display: "flex",
          width: "100%",
          height: `${sequenceHeight}px`,
          alignItems: "flex-end",
          position: "relative",
        }}
      >
        {Array(totalOctaves + 1)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "black",
                position: "absolute",
                top: `${(sequenceHeight / totalOctaves) * i}px`,
                opacity: 0.2,
              }}
            />
          ))}
        {sequence.map((n, i) => (
          <div
            key={i}
            style={{
              width: "calc(100% - 2px)",
              height: `${sequenceHeight}px`,
              backgroundColor: i === 0 ? "red" : "black",
              margin: "0 1px",
              position: "relative",
              transform: `scaleY(${(1 / (totalOctaves * 12)) * (n + 1)})`,
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        {sequence.map((n, i) => (
          <div key={i} style={{ width: "100%", textAlign: "center" }}>
            {getNoteName(n)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SequenceVisualizer;
