import { PauseIcon, PlayIcon, RotateCcw as ResetIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { clamp } from "@/lib/math";
import { cn } from "@/lib/utils";

type TransportTimeSignatureControlsProps = {
  beats: number;
  duration: number;
  index?: number;
  className?: string;
  onBarsChange: (value: number) => void;
  onBeatsChange: (value: number) => void;
};

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
  signatureBeats: TransportTimeSignatureControlsProps["beats"];
  signatureDuration: TransportTimeSignatureControlsProps["duration"];
  index?: number;
  isPlaying: boolean;
  onTempoChange: TransportTempoControlsProps["onChange"];
  onSignatureBarsChange: TransportTimeSignatureControlsProps["onBarsChange"];
  onSignatureBeatsChange: TransportTimeSignatureControlsProps["onBeatsChange"];
  onPlayToggle: () => void;
  onReset: () => void;
  className?: string;
};

const TransportTimeSignatureControls: React.FC<
  TransportTimeSignatureControlsProps
> = ({
  beats,
  duration,
  className,
  index = 0,
  onBarsChange,
  onBeatsChange,
}) => (
  <div className={cn("flex space-x-2 items-center", className)}>
    <span>Signature: </span>
    <div className="flex">
      <Input
        type="number"
        min={1}
        max={16}
        id={`timeSignatureBeats${index}`}
        name={`timeSignatureBeats${index}`}
        value={beats}
        className="max-w-[8rem]"
        onChange={(e) => onBarsChange(parseInt(e.target.value, 10))}
      />
      <span> / </span>
      <Input
        type="number"
        min={2}
        max={16}
        id={`timeSignatureDuration${index}`}
        name={`timeSignatureDuration${index}`}
        value={duration}
        className="max-w-[8rem]"
        onChange={(e) => onBeatsChange(parseInt(e.target.value, 10))}
      />
    </div>
  </div>
);

const TransportTempoControls: React.FC<TransportTempoControlsProps> = ({
  value,
  className,
  index = 0,
  min = 40,
  max = 200,
  onChange,
}) => (
  <div className={cn("flex space-x-2 items-center", className)}>
    <label htmlFor={`tempo${index}`}>BPM: </label>
    <Input
      type="number"
      id={`tempo${index}`}
      name={`tempo${index}`}
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(clamp(parseInt(e.target.value, 10), min, max))}
    />
  </div>
);

const TransportControls: React.FC<TransportControlsProps> = ({
  tempo,
  signatureBeats,
  signatureDuration,
  isPlaying,
  index,
  onTempoChange,
  onSignatureBarsChange,
  onSignatureBeatsChange,
  onPlayToggle,
  onReset,
  className,
}) => (
  <div className={cn("flex space-x-2 items-center", className)}>
    <Button variant="outline" onClick={onPlayToggle}>
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
      {isPlaying ? "Stop" : "Play"}
    </Button>
    <Button variant="outline" onClick={onReset}>
      <ResetIcon />
      Reset
    </Button>
    <TransportTempoControls
      value={tempo}
      index={index}
      onChange={onTempoChange}
    />
    <TransportTimeSignatureControls
      beats={signatureBeats}
      duration={signatureDuration}
      index={index}
      onBarsChange={onSignatureBarsChange}
      onBeatsChange={onSignatureBeatsChange}
    />
  </div>
);

export default TransportControls;
