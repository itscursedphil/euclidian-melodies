import React from "react";

import { Slider } from "@/components/UI/Slider";
import useEuclidianPattern from "@/hooks/useEuclidianPattern";
import { cn } from "@/lib/utils";

export type PatternRhythmHitsControlsProps = {
  value: ReturnType<typeof useEuclidianPattern>["hits"];
  steps: ReturnType<typeof useEuclidianPattern>["steps"];
  index?: number;
  onChange: ReturnType<typeof useEuclidianPattern>["handleHitsChange"];
  className?: string;
};

export type PatternRhythmStepsControlsProps = {
  value: ReturnType<typeof useEuclidianPattern>["steps"];
  index?: number;
  onChange: ReturnType<typeof useEuclidianPattern>["handleStepsChange"];
  className?: string;
};

export type PatternRhythmRotationControlsProps = {
  value: ReturnType<typeof useEuclidianPattern>["rotation"];
  steps: ReturnType<typeof useEuclidianPattern>["steps"];
  index?: number;
  onChange: ReturnType<typeof useEuclidianPattern>["handleRotationChange"];
  className?: string;
};

type PatternRhythmControlsProps = {
  steps: ReturnType<typeof useEuclidianPattern>["steps"];
  hits: ReturnType<typeof useEuclidianPattern>["hits"];
  rotation: ReturnType<typeof useEuclidianPattern>["rotation"];
  index?: number;
  className?: string;
  onStepsChange: ReturnType<typeof useEuclidianPattern>["handleStepsChange"];
  onHitsChange: ReturnType<typeof useEuclidianPattern>["handleHitsChange"];
  onRotationChange: ReturnType<
    typeof useEuclidianPattern
  >["handleRotationChange"];
};

export const PatternRhythmHitsControls: React.FC<
  PatternRhythmHitsControlsProps
> = ({ value, steps, index = 0, onChange, className }) => (
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

export const PatternRhythmStepsControls: React.FC<
  PatternRhythmStepsControlsProps
> = ({ value, index = 0, onChange, className }) => (
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

export const PatternRhythmRotationControls: React.FC<
  PatternRhythmRotationControlsProps
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

const PatternRhythmControls: React.FC<PatternRhythmControlsProps> = ({
  steps,
  hits,
  rotation,
  index,
  className,
  onStepsChange,
  onHitsChange,
  onRotationChange,
}) => (
  <div className={cn("", className)}>
    <PatternRhythmStepsControls
      value={steps}
      index={index}
      onChange={onStepsChange}
      className="mt-6"
    />
    <PatternRhythmHitsControls
      value={hits}
      steps={steps}
      index={index}
      onChange={onHitsChange}
      className="mt-6"
    />
    <PatternRhythmRotationControls
      value={rotation}
      steps={steps}
      index={index}
      onChange={onRotationChange}
      className="mt-6"
    />
  </div>
);

export default PatternRhythmControls;
