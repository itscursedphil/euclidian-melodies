import { PauseIcon, PlayIcon, RotateCcw as ResetIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { clamp } from "@/lib/math";
import { cn } from "@/lib/utils";

export type TransportTempoControlsProps = {
  value: number;
  className?: string;
  index?: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export type TransportControlsProps = {
  tempo: TransportTempoControlsProps["value"];
  index?: number;
  isPlaying: boolean;
  onTempoChange: TransportTempoControlsProps["onChange"];
  onPlayToggle: () => void;
  onReset: () => void;
  className?: string;
};

const TransportTempoControls: React.FC<TransportTempoControlsProps> = ({
  value,
  className,
  index = 0,
  min = 40,
  max = 200,
  onChange,
}) => (
  <div className={cn("flex space-x-2 items-center", className)}>
    <label htmlFor={`tempo${index}`}>BPM:</label>
    <Input
      type="number"
      id={`tempo${index}`}
      name={`tempo${index}`}
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(clamp(Number(e.target.value), min, max))}
    />
  </div>
);

const TransportControls: React.FC<TransportControlsProps> = ({
  tempo,
  isPlaying,
  index,
  onTempoChange,
  onPlayToggle,
  onReset,
  className,
}) => (
  <div className={cn("flex space-x-2 items-center", className)}>
    <TransportTempoControls
      value={tempo}
      index={index}
      onChange={onTempoChange}
    />
    <Button variant="outline" onClick={onPlayToggle}>
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
      {isPlaying ? "Stop" : "Play"}
    </Button>
    <Button variant="outline" onClick={onReset}>
      <ResetIcon />
      Reset
    </Button>
  </div>
);

export default TransportControls;
