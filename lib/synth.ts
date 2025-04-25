import React from "react";
import * as Tone from "tone";
import { RecursivePartial } from "tone/build/esm/core/util/Interface";

const monoSynthConfiguration: RecursivePartial<Tone.MonoSynthOptions> = {
  oscillator: {
    type: "sawtooth",
  },
  envelope: {
    attack: 0.005,
    release: 0.6,
  },
  filterEnvelope: {
    attack: 0,
    release: 0.8,
  },
};

export const initializeSynth = (
  synthRef: React.RefObject<Tone.MonoSynth | null>
) => {
  if (!synthRef.current) {
    synthRef.current = new Tone.MonoSynth(
      monoSynthConfiguration
    ).toDestination();
  }
};
