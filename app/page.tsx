"use client";
import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import useEuclidianPattern from "@/hooks/useEuclidianPattern";
import { noteNames, scales, getNoteName, getSequence } from "@/lib/melody";
import useNote from "@/hooks/useNote";

const HomePage = () => {
  const patterns = [
    useEuclidianPattern(),
    useEuclidianPattern(),
    useEuclidianPattern(),
    useEuclidianPattern(),
  ];
  const notes = [useNote(), useNote(), useNote(), useNote()];

  const [scale, setScale] = useState<keyof typeof scales>("Chromatic");

  const [isPlaying, setIsPlaying] = useState(false);

  const [index, setIndex] = useState(0);
  const indexRef = useRef(-1);

  const clock = useRef<Tone.Clock | null>(null);
  const synth = useRef<Tone.Synth | null>(null);

  const melody = getSequence(patterns, notes, scales[scale].notes, index);

  const advanceSequencer = useRef<(time: number) => void>(() => {});
  advanceSequencer.current = (time) => {
    indexRef.current = indexRef.current + 1;
    setIndex(indexRef.current);

    const nextMelody = getSequence(
      patterns,
      notes,
      scales[scale].notes,
      indexRef.current > -1 ? indexRef.current : 0
    );
    const note = nextMelody[0];
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
        8
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
                  onChange={(e) => {
                    handleStepsChange(e.currentTarget.value);
                  }}
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
                  onChange={(e) => {
                    handleHitsChange(e.currentTarget.value);
                  }}
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
                  onChange={(e) => {
                    handleRotationChange(e.currentTarget.value);
                  }}
                />
                <br />
                <br />
                <pre>{patternWithRotationFormatted}</pre>
                <br />
                <br />
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
                  onChange={(e) => {
                    handleNoteChange(e.currentTarget.value);
                  }}
                />
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
                  onChange={(e) => {
                    handleOctaveChange(e.currentTarget.value);
                  }}
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
        onChange={(e) => {
          setScale(e.currentTarget.value as keyof typeof scales);
        }}
      >
        {Object.keys(scales).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <br />
      <br />
      <button
        onClick={() => {
          initSynth();
          initClock();

          setIsPlaying((prev) => !prev);
        }}
      >
        {isPlaying ? "Stop" : "Play"}
      </button>
      <button
        onClick={() => {
          indexRef.current = -1;
          setIndex(0);
        }}
      >
        Reset
      </button>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          width: "100%",
          height: `${
            Math.floor(
              notes.reduce((height, { note, octave }) => {
                return height + note + octave * 12;
              }, 12) / 12
            ) *
            12 *
            5
          }px`,
          alignItems: "flex-end",
        }}
      >
        {melody.map((n, i) => (
          <div
            key={i}
            style={{
              width: "100%",
              height: `${(n + 1) * 5}px`,
              backgroundColor: i === 0 ? "red" : "black",
              border: "1px solid white",
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
        {melody.map((n, i) => (
          <div key={i} style={{ width: "100%", textAlign: "center" }}>
            {getNoteName(n)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
