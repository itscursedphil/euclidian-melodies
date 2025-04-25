"use client";
import {
  Pause as PauseIcon,
  Play as PlayIcon,
  RotateCcw as ResetIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

import {
  EuclidianRhythmHitsControls,
  EuclidianRhythmRotationControls,
  EuclidianRhythmStepsControls,
} from "@/components/EuclidianRhythm/EuclidianRhythmControls";
import EuclidianRhythmVisualizer from "@/components/EuclidianRhythm/EuclidianRhythmVisualizer";
import SequenceVisualizer from "@/components/Sequence/SequenceVisualizer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import useEuclidianPattern from "@/hooks/useEuclidianPattern";
import useNote from "@/hooks/useNote";
import { getNoteName, getSequence, scales } from "@/lib/melody";
import { initializeSynth } from "@/lib/synth";

type SequencerPlaybackDirection = "forward" | "backward";

const NoteControls: React.FC<{
  value: number;
  index?: number;
  onChange: ReturnType<typeof useNote>["handleNoteChange"];
  className?: string;
}> = ({ value, index = 0, onChange, className }) => (
  <div className={className}>
    <div className="flex justify-between">
      <label htmlFor={`note${index}`}>Note </label>
      <span>{getNoteName(value)}</span>
    </div>
    <Slider
      id={`note${index}`}
      name={`note${index}`}
      min={0}
      max={11}
      value={[value]}
      onValueChange={([v]) => {
        onChange(v);
      }}
      className="mt-2"
    />
  </div>
);

const OctaveControls: React.FC<{
  value: number;
  index?: number;
  onChange: ReturnType<typeof useNote>["handleOctaveChange"];
  className?: string;
}> = ({ value, index = 0, onChange, className }) => (
  <div className={className}>
    <div className="flex justify-between">
      <label htmlFor={`octave${index}`}>Octave </label>
      <span>{value}</span>
    </div>
    <Slider
      id={`octave${index}`}
      name={`octave${index}`}
      min={0}
      max={2}
      value={[value]}
      onValueChange={([v]) => {
        onChange(v);
      }}
      className="mt-2"
    />
  </div>
);

const ScaleSelect: React.FC<{
  value: string;
  index?: number;
  onChange: (nextScale: keyof typeof scales) => void;
  className?: string;
}> = ({ value, index = 0, onChange, className }) => (
  <div className={className}>
    <label htmlFor={`scale${index}`}>Scale: {value}</label>
    <br />
    <Select>
      <SelectTrigger className="">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(scales).map((key) => (
          <SelectItem key={key} value={key}>
            {key}
          </SelectItem>
        ))}
        {/* <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem> */}
      </SelectContent>
    </Select>
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
  const synth = useRef<Tone.MonoSynth | null>(null);

  const sequence = getSequence(patterns, notes, scales[scale].notes, index);

  const advanceSequencer = useRef<(time: number) => void>(() => {});
  advanceSequencer.current = (
    time,
    direction: SequencerPlaybackDirection = "forward"
  ) => {
    indexRef.current =
      indexRef.current > 0 && direction === "backward"
        ? indexRef.current - 1
        : indexRef.current + 1;
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
        0.01,
        time
      );
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
    initializeSynth(synth);
    initClock();

    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="w-full max-w-5xl px-8 mx-auto mt-12">
      <div className="w-full flex justify-between">
        <h1 className="text-4xl">Euclidian Melodies</h1>
        <nav className="flex items-center">
          <Button variant="outline" className="mr-2" asChild>
            <Link href="/">Learn</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Playground</Link>
          </Button>
        </nav>
      </div>
      <Separator className="mt-6" />
      <div className="flex w-full space-x-12 mt-6">
        {patterns.map(
          (
            {
              steps,
              hits,
              rotation,
              patternWithRotation,
              handleHitsChange,
              handleRotationChange,
              handleStepsChange,
            },
            i
          ) => {
            return (
              <div key={i} className="w-full">
                <h3>Pattern {i + 1}</h3>
                <Separator className="mt-4" />
                <EuclidianRhythmVisualizer
                  pattern={patternWithRotation}
                  index={index}
                  className="mt-6"
                />
                <EuclidianRhythmStepsControls
                  value={steps}
                  index={i}
                  onChange={handleStepsChange}
                  className="mt-6"
                />
                <EuclidianRhythmHitsControls
                  value={hits}
                  steps={steps}
                  index={i}
                  onChange={handleHitsChange}
                  className="mt-6"
                />
                <EuclidianRhythmRotationControls
                  value={rotation}
                  steps={steps}
                  index={i}
                  onChange={handleRotationChange}
                  className="mt-6"
                />
              </div>
            );
          }
        )}
      </div>
      <div className="flex w-full space-x-12">
        {notes.map(
          ({ note, octave, handleNoteChange, handleOctaveChange }, i) => {
            return (
              <div key={i} className="w-full">
                <NoteControls
                  value={note}
                  index={i}
                  onChange={handleNoteChange}
                  className="mt-6"
                />
                <OctaveControls
                  value={octave}
                  index={i}
                  onChange={handleOctaveChange}
                  className="mt-6"
                />
              </div>
            );
          }
        )}
      </div>
      <ScaleSelect value={scale} onChange={setScale} />
      <Button variant="outline" onClick={handlePlayToggleClick}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
        {isPlaying ? "Stop" : "Play"}
      </Button>
      <Button variant="outline" className="ml-2" onClick={handleResetClick}>
        <ResetIcon />
        Reset
      </Button>
      <SequenceVisualizer
        sequence={sequence}
        notes={notes}
        index={index}
        className="mt-8"
      />
    </div>
  );
};

export default HomePage;
