import { useState } from "react";

const useNote = ({
  initialNote = 0,
  initialOctave = 0,
}: {
  initialNote?: number;
  initialOctave?: number;
}) => {
  const [note, setNote] = useState(initialNote);
  const [octave, setOctave] = useState(initialOctave);

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
