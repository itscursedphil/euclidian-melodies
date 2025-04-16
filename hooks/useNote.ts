import { useState } from "react";

const useNote = () => {
  const [note, setNote] = useState(0);
  const [octave, setOctave] = useState(0);

  const handleNoteChange = (nextNote: string | number) => {
    const int =
      typeof nextNote === "string" ? parseInt(nextNote, 10) : nextNote;

    if (int < 12) {
      setNote(int ?? 0);
    }
  };

  const handleOctaveChange = (nextOctave: string | number) => {
    const int =
      typeof nextOctave === "string" ? parseInt(nextOctave, 10) : nextOctave;
    setOctave(int ?? 0);
  };

  return { note, octave, handleNoteChange, handleOctaveChange };
};

export default useNote;
