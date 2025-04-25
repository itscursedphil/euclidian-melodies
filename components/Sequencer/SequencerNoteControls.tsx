import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";
import { getNoteName } from "@/lib/note";
import {
  alteredScales,
  baseScales,
  experimentalScales,
  japaneseScales,
  modalScales,
  ScaleName,
  scales,
  traditionalScales,
} from "@/lib/scale";
import { cn } from "@/lib/utils";

export type SequencerScaleSelectProps = {
  index?: number;
  onChange: (nextScale: ScaleName) => void;
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
        <SelectGroup>
          <SelectLabel>Base</SelectLabel>
          {Object.keys(baseScales).map((key) => (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          ))}
          <SelectLabel>Modal</SelectLabel>
          {Object.keys(modalScales).map((key) => (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          ))}
          <SelectLabel>Altered</SelectLabel>
          {Object.keys(alteredScales).map((key) => (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          ))}
          <SelectLabel>Traditional</SelectLabel>
          {Object.keys(traditionalScales).map((key) => (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          ))}
          <SelectLabel>Japanese</SelectLabel>
          {Object.keys(japaneseScales).map((key) => (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          ))}
          <SelectLabel>Experimental</SelectLabel>
          {Object.keys(experimentalScales).map((key) => (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          ))}
        </SelectGroup>
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
