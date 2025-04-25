import { PauseIcon, PlayIcon, RotateCcw as ResetIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/UI/Button";
import { cn } from "@/lib/utils";

export type TransportControlsProps = {
  isPlaying: boolean;
  onPlayToggle: () => void;
  onReset: () => void;
  className?: string;
};

const TransportControls: React.FC<TransportControlsProps> = ({
  isPlaying,
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
  </div>
);

export default TransportControls;
