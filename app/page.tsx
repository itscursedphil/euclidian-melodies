"use client";
import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

import useEuclidianPattern from "@/hooks/useEuclidianPattern";
import useNote from "@/hooks/useNote";
import { noteNames, scales, getNoteName, getSequence } from "@/lib/melody";
import SequenceVisualizer from "@/components/Sequence/SequenceVisualizer";
import {
  EuclidianRhythmHitsControls,
  EuclidianRhythmRotationControls,
  EuclidianRhythmStepsControls,
} from "@/components/EuclidianRhythm/EuclidianRhythmControls";

const NoteControls: React.FC<{
  value: number;
  index?: number;
  onChange: ReturnType<typeof useNote>["handleNoteChange"];
}> = ({ value, index = 0, onChange }) => (
  <div>
    <label htmlFor={`note${index}`}>Note: {noteNames[value]}</label>
    <br />
    <input
      type="range"
      id={`note${index}`}
      name={`note${index}`}
      min="0"
      max="11"
      value={value}
      onChange={(e) => {
        onChange(e.currentTarget.value);
      }}
    />
  </div>
);

const OctaveControls: React.FC<{
  value: number;
  index?: number;
  onChange: ReturnType<typeof useNote>["handleOctaveChange"];
}> = ({ value, index = 0, onChange }) => (
  <div>
    <label htmlFor={`octave${index}`}>Octave: {value}</label>
    <br />
    <input
      type="range"
      id={`octave${index}`}
      name={`octave${index}`}
      min="0"
      max="2"
      value={value}
      onChange={(e) => {
        onChange(e.currentTarget.value);
      }}
    />
  </div>
);

const ScaleSelect: React.FC<{
  value: string;
  index?: number;
  onChange: (nextScale: keyof typeof scales) => void;
}> = ({ value, index = 0, onChange }) => (
  <div>
    <label htmlFor={`scale${index}`}>Scale: {value}</label>
    <br />
    <select
      id={`scale${index}`}
      name={`scale${index}`}
      value={value}
      onChange={(e) => {
        onChange(e.currentTarget.value as keyof typeof scales);
      }}
    >
      {Object.keys(scales).map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  </div>
);

const HomePage = () => {
  const patterns = [
    useEuclidianPattern({}),
    useEuclidianPattern({}),
    useEuclidianPattern({}),
    useEuclidianPattern({}),
  ];
  const notes = [
    useNote({ initialNote: 7 }),
    useNote({}),
    useNote({}),
    useNote({}),
  ];

  const [scale, setScale] = useState<keyof typeof scales>("Chromatic");

  const [isPlaying, setIsPlaying] = useState(false);

  const [index, setIndex] = useState(0);
  const indexRef = useRef(-1);

  const clock = useRef<Tone.Clock | null>(null);
  const synth = useRef<Tone.Synth | null>(null);

  const sequence = getSequence(patterns, notes, scales[scale].notes, index);

  const advanceSequencer = useRef<(time: number) => void>(() => {});
  advanceSequencer.current = (time) => {
    indexRef.current = indexRef.current + 1;
    setIndex(indexRef.current);

    const nextSequence = getSequence(
      patterns,
      notes,
      scales[scale].notes,
      indexRef.current > -1 ? indexRef.current : 0
    );
    const note = nextSequence[0];
    const noteName = getNoteName(note);
    const octave = Math.floor(note / 12);

    if (synth.current) {
      synth.current.triggerAttackRelease(
        `${noteName}${4 + octave}`,
        "16n",
        time
      );
    }
  };

  const initSynth = () => {
    if (!synth.current) {
      synth.current = new Tone.Synth().toDestination();
    }
  };

  const initClock = () => {
    if (!clock.current) {
      clock.current = new Tone.Clock(
        (time) => advanceSequencer.current(time),
        4
      );
    }
  };

  useEffect(() => {
    if (isPlaying) {
      clock.current?.start();
    } else {
      clock.current?.stop();
    }
  }, [isPlaying]);

  const handleResetClick = () => {
    indexRef.current = -1;
    setIndex(0);
  };

  const handlePlayToggleClick = () => {
    initSynth();
    initClock();

    setIsPlaying((prev) => !prev);
  };

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
                <EuclidianRhythmStepsControls
                  value={steps}
                  index={i}
                  onChange={handleStepsChange}
                />
                <EuclidianRhythmHitsControls
                  value={hits}
                  steps={steps}
                  index={i}
                  onChange={handleHitsChange}
                />
                <EuclidianRhythmRotationControls
                  value={rotation}
                  steps={steps}
                  index={i}
                  onChange={handleRotationChange}
                />
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
                <NoteControls
                  value={note}
                  index={i}
                  onChange={handleNoteChange}
                />
                <OctaveControls
                  value={octave}
                  index={i}
                  onChange={handleOctaveChange}
                />
              </div>
            );
          }
        )}
      </div>
      <ScaleSelect value={scale} onChange={setScale} />
      <button onClick={handlePlayToggleClick}>
        {isPlaying ? "Stop" : "Play"}
      </button>
      <button onClick={handleResetClick}>Reset</button>
      <SequenceVisualizer sequence={sequence} notes={notes} />
    </div>
  );
};

export default HomePage;
