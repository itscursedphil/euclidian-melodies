"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

import EuclidianRhythmVisualizer from "@/components/EuclidianRhythm/EuclidianRhythmVisualizer";
import PatternRhythmControls from "@/components/Pattern/PatternRhythmControls";
import PatternSequenceControls from "@/components/Pattern/PatternSequenceControls";
import SequencerNoteControls from "@/components/Sequencer/SequencerNoteControls";
import SequencerTransportControls from "@/components/Sequencer/SequencerTransportControls";
import SequenceVisualizer from "@/components/Sequencer/SequenceVisualizer";
import { Button } from "@/components/UI/Button";
import { Separator } from "@/components/UI/Separator";
import useEuclidianPattern from "@/hooks/useEuclidianPattern";
import useNote from "@/hooks/useNote";
import { getNoteName } from "@/lib/note";
import { scales } from "@/lib/scale";
import { getSequence, SequencerPlaybackDirection } from "@/lib/sequencer";
import { createMonoSynth, playNote } from "@/lib/synth";

const PageHeader: React.FC = () => (
  <div className="w-full flex justify-between">
    <h1 className="text-4xl">Euclidian Melodies</h1>
    <nav className="flex items-center">
      <Button variant="outline" className="mr-2" asChild>
        <Link href="/">Learn</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href="/">Explore</Link>
      </Button>
    </nav>
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

  const [root, setRoot] = useState(0);
  const [scale, setScale] = useState<keyof typeof scales>("Chromatic");

  const [isPlaying, setIsPlaying] = useState(false);

  const [index, setIndex] = useState(0);
  const indexRef = useRef(-1);

  const clock = useRef<Tone.Clock | null>(null);
  const synth = useRef<Tone.MonoSynth | null>(null);

  const sequence = getSequence(
    patterns,
    notes,
    scales[scale].notes,
    index,
    root
  );

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
      indexRef.current > -1 ? indexRef.current : 0,
      root
    );
    const note = nextSequence[0];
    const noteName = getNoteName(note);
    const octave = Math.floor(note / 12);

    if (synth.current) {
      playNote(synth.current, noteName, octave, time);
    }
  };

  const initializeClock = () => {
    if (!clock.current) {
      clock.current = new Tone.Clock(
        (time) => advanceSequencer.current(time),
        4
      );
    }
  };

  const initializeSynth = (
    synthRef: React.RefObject<Tone.MonoSynth | null>
  ) => {
    if (!synthRef.current) {
      synthRef.current = createMonoSynth();
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
    initializeClock();
    initializeSynth(synth);

    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="w-full max-w-5xl px-8 mx-auto mt-12">
      <PageHeader />
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
                <PatternRhythmControls
                  steps={steps}
                  hits={hits}
                  rotation={rotation}
                  index={i}
                  onStepsChange={handleStepsChange}
                  onHitsChange={handleHitsChange}
                  onRotationChange={handleRotationChange}
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
              <PatternSequenceControls
                key={i}
                className="w-full"
                note={note}
                octave={octave}
                index={i}
                onNoteChange={handleNoteChange}
                onOctaveChange={handleOctaveChange}
              />
            );
          }
        )}
      </div>
      <div className="flex justify-between items-center mt-12">
        <SequencerTransportControls
          isPlaying={isPlaying}
          onPlayToggle={handlePlayToggleClick}
          onReset={handleResetClick}
        />
        <SequencerNoteControls
          onRootNoteChange={setRoot}
          onScaleChange={setScale}
        />
      </div>
      <SequenceVisualizer
        sequence={sequence}
        notes={notes}
        index={index}
        root={root}
        className="my-6"
      />
    </div>
  );
};

export default HomePage;
