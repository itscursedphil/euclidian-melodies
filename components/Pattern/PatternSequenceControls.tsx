import React from "react";

import { Slider } from "@/components/UI/Slider";
import useNote from "@/hooks/useNote";
import { cn } from "@/lib/utils";

export type PatternSequenceNoteControlsProps = {
  value: ReturnType<typeof useNote>["note"];
  index?: number;
  onChange: ReturnType<typeof useNote>["handleNoteChange"];
  className?: string;
};

export type PatternSequenceOctaveControlsProps = {
  value: ReturnType<typeof useNote>["octave"];
  index?: number;
  onChange: ReturnType<typeof useNote>["handleOctaveChange"];
  className?: string;
};

export type PatternSequenceControlsProps = {
  note: ReturnType<typeof useNote>["note"];
  octave: ReturnType<typeof useNote>["octave"];
  index?: number;
  className?: string;
  onNoteChange: ReturnType<typeof useNote>["handleNoteChange"];
  onOctaveChange: ReturnType<typeof useNote>["handleOctaveChange"];
};

export const PatternSequenceNoteControls: React.FC<
  PatternSequenceNoteControlsProps
> = ({ value, index = 0, onChange, className }) => (
  <div className={className}>
    <div className="flex justify-between">
      <label htmlFor={`note${index}`}>Note </label>
      <span>{value}</span>
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

export const PatternSequenceOctaveControls: React.FC<
  PatternSequenceOctaveControlsProps
> = ({ value, index = 0, onChange, className }) => (
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

const PatternSequenceControls: React.FC<PatternSequenceControlsProps> = ({
  note,
  octave,
  index,
  className,
  onNoteChange,
  onOctaveChange,
}) => (
  <div className={cn("", className)}>
    <PatternSequenceNoteControls
      value={note}
      index={index}
      onChange={onNoteChange}
      className="mt-6"
    />
    <PatternSequenceOctaveControls
      value={octave}
      index={index}
      onChange={onOctaveChange}
      className="mt-6"
    />
  </div>
);

export default PatternSequenceControls;
