export const getClockFrequencyFromTempo = (tempo: number, beats = 4) =>
  (tempo / 60) * beats;
