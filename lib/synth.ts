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

export const createMonoSynth = () =>
  new Tone.MonoSynth(monoSynthConfiguration).toDestination();

export const playNote = (
  synth: Tone.MonoSynth,
  noteName: string,
  octave: number,
  time?: number
) => {
  synth.triggerAttackRelease(`${noteName}${4 + octave}`, 0.01, time);
};
