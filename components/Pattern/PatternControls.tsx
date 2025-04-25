import React from "react";

import { Slider } from "@/components/UI/Slider";
import useEuclidianPattern from "@/hooks/useEuclidianPattern";
import useNote from "@/hooks/useNote";

export type PatternHitsControlsProps = {
  value: number;
  steps: number;
  index?: number;
  onChange: ReturnType<typeof useEuclidianPattern>["handleHitsChange"];
  className?: string;
};

export type PatternStepsControlsProps = {
  value: number;
  index?: number;
  onChange: ReturnType<typeof useEuclidianPattern>["handleStepsChange"];
  className?: string;
};

export type PatternRotationControlsProps = {
  value: number;
  steps: number;
  index?: number;
  onChange: ReturnType<typeof useEuclidianPattern>["handleRotationChange"];
  className?: string;
};

export type PatternNoteControlsProps = {
  value: number;
  index?: number;
  onChange: ReturnType<typeof useNote>["handleNoteChange"];
  className?: string;
};

export type PatternOctaveControlsProps = {
  value: number;
  index?: number;
  onChange: ReturnType<typeof useNote>["handleOctaveChange"];
  className?: string;
};

export const PatternHitsControls: React.FC<PatternHitsControlsProps> = ({
  value,
  steps,
  index = 0,
  onChange,
  className,
}) => (
  <div className={className}>
    <div className="flex justify-between">
      <label htmlFor={`hits${index}`}>Hits </label>
      <span>{value}</span>
    </div>
    <Slider
      id={`hits${index}`}
      name={`hits${index}`}
      min={0}
      max={steps}
      value={[value]}
      onValueChange={([v]) => {
        onChange(v);
      }}
      className="mt-2"
    />
  </div>
);

export const PatternStepsControls: React.FC<PatternStepsControlsProps> = ({
  value,
  index = 0,
  onChange,
  className,
}) => (
  <div className={className}>
    <div className="flex justify-between">
      <label htmlFor={`steps${index}`}>Steps </label>
      <span>{value}</span>
    </div>
    <Slider
      id={`steps${index}`}
      name={`steps${index}`}
      min={1}
      max={16}
      value={[value]}
      onValueChange={([v]) => {
        onChange(v);
      }}
      className="mt-2"
    />
  </div>
);

export const PatternRotationControls: React.FC<
  PatternRotationControlsProps
> = ({ value, steps, index = 0, onChange, className }) => (
  <div className={className}>
    <div className="flex justify-between">
      <label htmlFor={`rotation${index}`}>Rotation </label>
      <span>{value}</span>
    </div>
    <Slider
      id={`rotation${index}`}
      name={`rotation${index}`}
      min={0}
      max={steps - 1}
      value={[value]}
      onValueChange={([v]) => {
        onChange(v);
      }}
      className="mt-2"
    />
  </div>
);

export const PatternNoteControls: React.FC<PatternNoteControlsProps> = ({
  value,
  index = 0,
  onChange,
  className,
}) => (
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

export const PatternOctaveControls: React.FC<PatternOctaveControlsProps> = ({
  value,
  index = 0,
  onChange,
  className,
}) => (
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
