import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";
import { getNoteName } from "@/lib/note";
import { scales } from "@/lib/scale";
import { cn } from "@/lib/utils";

export type SequencerScaleSelectProps = {
  index?: number;
  onChange: (nextScale: keyof typeof scales) => void;
  className?: string;
};

export type SequencerRootNoteSelectProps = {
  index?: number;
  onChange: (nextRootNote: number) => void;
  className?: string;
};

export type SequencerNoteControlsProps = {
  onRootNoteChange: SequencerRootNoteSelectProps["onChange"];
  onScaleChange: SequencerScaleSelectProps["onChange"];
};

export const SequencerScaleSelect: React.FC<SequencerScaleSelectProps> = ({
  index = 0,
  onChange,
  className,
}) => (
  <div className={cn("flex items-center space-x-2", className)}>
    <label htmlFor={`scale${index}`}>Scale:</label>
    <Select
      defaultValue={"Chromatic" as keyof typeof scales}
      onValueChange={onChange}
      name={`scale${index}`}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(scales).map((key) => (
          <SelectItem key={key} value={key}>
            {key}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export const SequencerRootNoteSelect: React.FC<
  SequencerRootNoteSelectProps
> = ({ index = 0, onChange, className }) => (
  <div className={cn("flex items-center space-x-2", className)}>
    <label htmlFor={`rootNote${index}`}>Root:</label>
    <Select
      defaultValue="0"
      onValueChange={(v) => onChange(parseInt(v, 10))}
      name={`rootNote${index}`}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <SelectItem key={i} value={`${i}`}>
              {getNoteName(i)}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  </div>
);

const SequencerNoteControls: React.FC<SequencerNoteControlsProps> = ({
  onRootNoteChange,
  onScaleChange,
}) => (
  <div className="flex items-center space-x-2">
    <SequencerRootNoteSelect onChange={onRootNoteChange} />
    <SequencerScaleSelect onChange={onScaleChange} />
  </div>
);

export default SequencerNoteControls;
