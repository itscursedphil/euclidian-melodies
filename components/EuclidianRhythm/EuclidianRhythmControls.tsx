import React from "react";
import useEuclidianPattern from "@/hooks/useEuclidianPattern";

export const EuclidianRhythmHitsControls: React.FC<{
  value: number;
  steps: number;
  index?: number;
  onChange: ReturnType<typeof useEuclidianPattern>["handleHitsChange"];
}> = ({ value, steps, index = 0, onChange }) => (
  <div>
    <label htmlFor={`hits${index}`}>Hits: {value}</label>
    <br />
    <input
      type="range"
      id={`hits${index}`}
      name={`hits${index}`}
      min="0"
      max={steps}
      value={value}
      onChange={(e) => {
        onChange(e.currentTarget.value);
      }}
    />
  </div>
);

export const EuclidianRhythmStepsControls: React.FC<{
  value: number;
  index?: number;
  onChange: ReturnType<typeof useEuclidianPattern>["handleStepsChange"];
}> = ({ value, index = 0, onChange }) => (
  <div>
    <label htmlFor={`steps${index}`}>Steps: {value}</label>
    <br />
    <input
      type="range"
      id={`steps${index}`}
      name={`steps${index}`}
      min="0"
      max="16"
      value={value}
      onChange={(e) => {
        onChange(e.currentTarget.value);
      }}
    />
  </div>
);

export const EuclidianRhythmRotationControls: React.FC<{
  value: number;
  steps: number;
  index?: number;
  onChange: ReturnType<typeof useEuclidianPattern>["handleRotationChange"];
}> = ({ value, steps, index = 0, onChange }) => (
  <div>
    <label htmlFor={`rotation${index}`}>Rotation: {value}</label>
    <br />
    <input
      type="range"
      id={`rotation${index}`}
      name={`rotation${index}`}
      min="0"
      max={steps - 1}
      value={value}
      onChange={(e) => {
        onChange(e.currentTarget.value);
      }}
    />
  </div>
);
