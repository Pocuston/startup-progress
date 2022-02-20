import * as React from "react";
import Box from "@mui/material/Box";
import { StartupProgress, Stage } from "./model";
import StageView from "./StageView";

export interface ProgressViewProps {
  startupProgress: StartupProgress;
  onStepComplete: (
    stageNumber: number,
    stepNumber: number,
    completed: boolean
  ) => void;
}

export default function ProgressView({
  startupProgress,
  onStepComplete,
}: ProgressViewProps) {
  function isUnlocked(stage: Stage, stageNumber: number): boolean {
    return (
      !stage.completed &&
      (stageNumber === 0 || startupProgress.stages[stageNumber - 1]?.completed)
    );
  }

  return (
    <Box>
      <h1>{startupProgress.name}</h1>
      {startupProgress.stages.map((stage, index) => (
        <StageView
          stage={stage}
          stageNumber={index}
          onStepCompleteChange={onStepComplete}
          isUnlocked={isUnlocked(stage, index)}
          key={index}
        />
      ))}
    </Box>
  );
}
