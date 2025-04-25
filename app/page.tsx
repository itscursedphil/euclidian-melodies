"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
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
import { getClockFrequencyFromTempo } from "@/lib/clock";
import { getNoteName } from "@/lib/note";
import { ScaleName, scales } from "@/lib/scale";
import { getSequence, SequencerPlaybackDirection } from "@/lib/sequencer";
import { createMonoSynth, playNote } from "@/lib/synth";

const PageHeader: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full flex justify-between">
      <h1 className="text-4xl">Euclidian Melodies</h1>
      <nav className="flex space-x-2 items-center">
        <Button variant="outline" asChild>
          <Link href="/">Learn</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Explore</Link>
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </nav>
    </div>
  );
};

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
  const [scale, setScale] = useState<ScaleName>("Chromatic");

  const [tempo, setTempo] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);

  const [signatureBeats, setSignatureBeats] = useState(4);
  const [signatureDuration, setSignatureDuration] = useState(4);

  const barLength = signatureBeats * signatureDuration;

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
        getClockFrequencyFromTempo(tempo)
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

  useEffect(() => {
    if (clock.current) {
      clock.current.set({ frequency: getClockFrequencyFromTempo(tempo) });
    }
  }, [tempo]);

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
        <SequencerNoteControls
          onRootNoteChange={setRoot}
          onScaleChange={setScale}
        />
        <SequencerTransportControls
          tempo={tempo}
          signatureBeats={signatureBeats}
          signatureDuration={signatureDuration}
          index={0}
          isPlaying={isPlaying}
          onTempoChange={setTempo}
          onSignatureBarsChange={setSignatureBeats}
          onSignatureBeatsChange={setSignatureDuration}
          onPlayToggle={handlePlayToggleClick}
          onReset={handleResetClick}
        />
      </div>
      <SequenceVisualizer
        sequence={sequence}
        notes={notes}
        index={index}
        root={root}
        barLength={barLength}
        className="my-6"
      />
    </div>
  );
};

export default HomePage;
