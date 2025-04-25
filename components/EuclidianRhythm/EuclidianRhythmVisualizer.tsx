import React from "react";

import { cn } from "@/lib/utils";

export type EuclidianRhythmVisualizerProps = {
  pattern: number[];
  index?: number;
  className?: string;
};

const EuclidianRhythmVisualizer: React.FC<EuclidianRhythmVisualizerProps> = ({
  pattern,
  index = -1,
  className,
}) => {
  return (
    <div className={cn("w-full aspect-square relative -rotate-90", className)}>
      {/* <div className="absolute top-[4%] right-[4%] bottom-[4%] left-[4%] border-1 rounded-full" /> */}
      {pattern.map((v, i) => (
        <div
          key={i}
          className="w-1/2 h-[1px] top-1/2 left-1/2 absolute origin-left bg-secondary"
          style={{ transform: `rotate(${(i * 360) / pattern.length}deg)` }}
        >
          <div
            className={`w-1/6 aspect-square absolute left-full rounded-full -translate-x-full -translate-y-1/2 bg-background border-1 ${
              v
                ? "border-primary outline-primary"
                : "border-secondary outline-secondary"
            } ${index > -1 && index % pattern.length === i ? "outline-2" : ""}`}
          />
        </div>
      ))}
    </div>
  );
};

export default EuclidianRhythmVisualizer;
