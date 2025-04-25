import React from "react";

import { Slider } from "@/components/UI/Slider";
import useEuclidianPattern from "@/hooks/useEuclidianPattern";

export const EuclidianRhythmHitsControls: React.FC<{
  value: number;
  steps: number;
  index?: number;
  onChange: ReturnType<typeof useEuclidianPattern>["handleHitsChange"];
  className?: string;
}> = ({ value, steps, index = 0, onChange, className }) => (
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

export const EuclidianRhythmStepsControls: React.FC<{
  value: number;
  index?: number;
  onChange: ReturnType<typeof useEuclidianPattern>["handleStepsChange"];
  className?: string;
}> = ({ value, index = 0, onChange, className }) => (
  <div className={className}>
    <div className="flex justify-between">
      <label htmlFor={`steps${index}`}>Steps </label>
      <span>{value}</span>
    </div>
    <Slider
      id={`steps${index}`}
      name={`steps${index}`}
      min={0}
      max={16}
      value={[value]}
      onValueChange={([v]) => {
        onChange(v);
      }}
      className="mt-2"
    />
  </div>
);

export const EuclidianRhythmRotationControls: React.FC<{
  value: number;
  steps: number;
  index?: number;
  onChange: ReturnType<typeof useEuclidianPattern>["handleRotationChange"];
  className?: string;
}> = ({ value, steps, index = 0, onChange, className }) => (
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
