import * as React from "react";
import Box from "@mui/material/Box";
import { Stage } from "./model";
import StageView from "./StageView";
import useStartupProgressData from "./useStartupProgressData";
import AddStage from "./AddStage";

export default function ProgressView() {
  const [
    startupProgress,
    handleStepCompleteChange,
    handleAddStage,
    handleAddStep,
  ] = useStartupProgressData();

  function isStageUnlocked(stage: Stage, stageNumber: number): boolean {
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
          onStepCompleteChange={handleStepCompleteChange}
          onAddStep={handleAddStep}
          isUnlocked={isStageUnlocked(stage, index)}
          key={index}
        />
      ))}
      <AddStage
        stageNumber={startupProgress.stages.length + 1}
        onAddStage={handleAddStage}
      />
    </Box>
  );
}
