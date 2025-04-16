import { useState } from "react";

import {
  getEuclidianPattern,
  rotatePattern,
  formatPattern,
} from "@/lib/euclidian";

const useEuclidianPattern = () => {
  const [steps, setSteps] = useState(16);
  const [hits, setHits] = useState(4);
  const [rotation, setRotation] = useState(0);

  const pattern = getEuclidianPattern(hits, steps);
  const patternWithRotation = rotatePattern(pattern, rotation);
  const patternWithRotationFormatted = formatPattern(patternWithRotation);

  const handleStepsChange = (nextSteps: string | number) => {
    const int =
      typeof nextSteps === "string" ? parseInt(nextSteps, 10) : nextSteps;

    if (int < hits) {
      setHits(int);
    }

    if (int < rotation) {
      setRotation(int);
    }

    setSteps(int);
  };

  const handleHitsChange = (nextHits: string | number) => {
    const int =
      typeof nextHits === "string" ? parseInt(nextHits, 10) : nextHits;

    if (int < steps + 1) {
      setHits(int);
    }
  };

  const handleRotationChange = (nextRotation: string | number) => {
    const int =
      typeof nextRotation === "string"
        ? parseInt(nextRotation, 10)
        : nextRotation;

    if (int < steps) {
      setRotation(int);
    }
  };

  return {
    steps,
    hits,
    rotation,
    pattern,
    patternWithRotation,
    patternWithRotationFormatted,
    handleStepsChange,
    handleHitsChange,
    handleRotationChange,
  };
};

export default useEuclidianPattern;
