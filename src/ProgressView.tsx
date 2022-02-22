import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Stage } from "./model";
import StageView from "./StageView";
import useStartupProgressData from "./useStartupProgressData";
import AddStage from "./AddStage";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

//TODO veci z hooku do modelu
export default function ProgressView() {
  const [
    startupProgress,
    handleStepCompleteChange,
    handleAddStage,
    handleAddStep,
    handleDeleteStage,
    handleDeleteStep,
  ] = useStartupProgressData();

  const [isAddStageInProgress, setIsAddStageInProgress] = useState(
    startupProgress.stages.length === 0
  );

  //TODO move to model
  function isStageUnlocked(stage: Stage, stageNumber: number): boolean {
    return (
      !stage.completed &&
      (stageNumber === 0 || startupProgress.stages[stageNumber - 1]?.completed)
    );
  }

  function handleAddStageStart() {
    setIsAddStageInProgress(true);
  }

  function handleAddStageCancel() {
    setIsAddStageInProgress(false);
  }

  function handleAddStageComplete(name: string) {
    handleAddStage(name);
    setIsAddStageInProgress(false);
  }

  return (
    <Box>
      <Typography variant={"h3"} sx={{ ml: 2, mt: 2 }}>
        {startupProgress.name}
      </Typography>
      {startupProgress?.stages.map((stage, index) => (
        <StageView
          stage={stage}
          stageNumber={index}
          onStepCompleteChange={handleStepCompleteChange}
          onAddStep={handleAddStep}
          onDeleteStage={handleDeleteStage}
          onDeleteStep={handleDeleteStep}
          isUnlocked={isStageUnlocked(stage, index)}
          key={index}
        />
      ))}
      {isAddStageInProgress && (
        <AddStage
          stageNumber={startupProgress?.stages.length + 1}
          onAddStage={handleAddStageComplete}
          onCancel={handleAddStageCancel}
        />
      )}
      <Button
        sx={{ ml: 1 }}
        onClick={handleAddStageStart}
        disabled={isAddStageInProgress}
        startIcon={<AddIcon />}
      >
        Add stage
      </Button>
    </Box>
  );
}
