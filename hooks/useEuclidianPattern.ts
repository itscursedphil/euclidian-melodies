import { useState } from "react";

import {
  formatPattern,
  getEuclidianPattern,
  rotatePattern,
} from "@/lib/euclidian";

const useEuclidianPattern = ({
  initialSteps = 16,
  initialHits = 4,
  initialRotation = 0,
}: {
  initialSteps?: number;
  initialHits?: number;
  initialRotation?: number;
}) => {
  const [steps, setSteps] = useState(initialSteps);
  const [hits, setHits] = useState(initialHits);
  const [rotation, setRotation] = useState(initialRotation);

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
