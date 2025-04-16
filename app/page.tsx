"use client";
import React, { useState } from "react";
import useEuclidianPattern from "@/hooks/useEuclidianPattern";
import { findNearestNoteInScale, noteNames, scales } from "@/lib/melody";
import useNote from "@/hooks/useNote";

const HomePage = () => {
  const [scale, setScale] = useState<keyof typeof scales>("Chromatic");

  const patterns = [
    useEuclidianPattern(),
    useEuclidianPattern(),
    useEuclidianPattern(),
    useEuclidianPattern(),
  ];
  const notes = [useNote(), useNote(), useNote(), useNote()];

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        {patterns.map(
          (
            {
              steps,
              hits,
              rotation,
              patternWithRotationFormatted,
              handleHitsChange,
              handleRotationChange,
              handleStepsChange,
            },
            i
          ) => {
            return (
              <div key={i} style={{ width: "100%" }}>
                <h3>Pattern {i + 1}</h3>
                <label htmlFor={`steps${i}`}>Steps: {steps}</label>
                <br />
                <input
                  type="range"
                  id={`steps${i}`}
                  name={`steps${i}`}
                  min="0"
                  max="16"
                  value={steps}
                  onChange={(e) => handleStepsChange(e.currentTarget.value)}
                />
                <br />
                <br />
                <label htmlFor={`hits${i}`}>Hits: {hits}</label>
                <br />
                <input
                  type="range"
                  id={`hits${i}`}
                  name={`hits${i}`}
                  min="0"
                  max={steps}
                  value={hits}
                  onChange={(e) => handleHitsChange(e.currentTarget.value)}
                />
                <br />
                <br />
                <label htmlFor={`rotation${i}`}>Rotation: {rotation}</label>
                <br />
                <input
                  type="range"
                  id={`rotation${i}`}
                  name={`rotation${i}`}
                  min="0"
                  max={steps - 1}
                  value={rotation}
                  onChange={(e) => handleRotationChange(e.currentTarget.value)}
                />
                <br />
                <br />
                <pre>{patternWithRotationFormatted}</pre>
              </div>
            );
          }
        )}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        {notes.map(
          ({ note, octave, handleNoteChange, handleOctaveChange }, i) => {
            return (
              <div key={i} style={{ width: "100%" }}>
                <label htmlFor={`note${i}`}>Note: {noteNames[note]}</label>
                <br />
                <input
                  type="range"
                  id={`note${i}`}
                  name={`note${i}`}
                  min="0"
                  max="11"
                  value={note}
                  onChange={(e) => handleNoteChange(e.currentTarget.value)}
                />
                <br />
                Note in scale: 
                {
                  noteNames[
                    findNearestNoteInScale(note, scales[scale].notes) % 12
                  ]
                }
                <br />
                <br />
                <label htmlFor={`octave${i}`}>Octave: {octave}</label>
                <br />
                <input
                  type="range"
                  id={`octave${i}`}
                  name={`octave${i}`}
                  min="0"
                  max="2"
                  value={octave}
                  onChange={(e) => handleOctaveChange(e.currentTarget.value)}
                />
              </div>
            );
          }
        )}
      </div>
      <br />
      <br />
      <label htmlFor="scale">Scale: {scale}</label>
      <br />
      <select
        id="scale"
        name="scale"
        value={scale}
        onChange={(e) => setScale(e.currentTarget.value as keyof typeof scales)}
      >
        {Object.keys(scales).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HomePage;
