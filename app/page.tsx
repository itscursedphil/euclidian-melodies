"use client";
import useEuclidianPattern from "@/hooks/useEuclidianPattern";
import React from "react";

const HomePage = () => {
  const euclidian1 = useEuclidianPattern();

  return (
    <div>
      <label htmlFor="steps">Steps: {euclidian1.steps}</label>
      <br />
      <input
        type="range"
        id="steps"
        name="steps"
        min="0"
        max="16"
        value={euclidian1.steps}
        onChange={(e) => euclidian1.handleStepsChange(e.currentTarget.value)}
      />
      <br />
      <br />
      <label htmlFor="hits">Hits: {euclidian1.hits}</label>
      <br />
      <input
        type="range"
        id="hits"
        name="hits"
        min="0"
        max={euclidian1.steps}
        value={euclidian1.hits}
        onChange={(e) => euclidian1.handleHitsChange(e.currentTarget.value)}
      />
      <br />
      <br />
      <label htmlFor="rotation">Rotation: {euclidian1.rotation}</label>
      <br />
      <input
        type="range"
        id="rotation"
        name="rotation"
        min="0"
        max={euclidian1.steps - 1}
        value={euclidian1.rotation}
        onChange={(e) => euclidian1.handleRotationChange(e.currentTarget.value)}
      />
      <br />
      <br />
      <pre>{euclidian1.patternWithRotationFormatted}</pre>
      <br />
      <br />
      <label htmlFor="index">Index: {euclidian1.index}</label>
      <br />
      <input
        type="number"
        id="index"
        name="index"
        min="0"
        value={euclidian1.index}
        onChange={(e) => euclidian1.handleIndexChange(e.currentTarget.value)}
      />
      <br />
      <br />
      <pre>{euclidian1.currentValueFormatted}</pre>
    </div>
  );
};

export default HomePage;
