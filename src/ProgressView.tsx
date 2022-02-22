import * as React from "react";
import Box from "@mui/material/Box";
import { Stage } from "./model";
import StageView from "./StageView";
import useStartupProgressData from "./useStartupProgressData";
import AddStage from "./AddStage";
import { Button, Grid } from "@mui/material";
import { useState } from "react";

export default function ProgressView() {
  const [
    startupProgress,
    handleStepCompleteChange,
    handleAddStage,
    handleAddStep,
  ] = useStartupProgressData();

  const [editMode, setEditMode] = useState(startupProgress.stages.length === 0);

  function isStageUnlocked(stage: Stage, stageNumber: number): boolean {
    return (
      !stage.completed &&
      (stageNumber === 0 || startupProgress.stages[stageNumber - 1]?.completed)
    );
  }

  function handleCancel() {
    setEditMode(false);
  }

  return (
    <Box>
      <h1>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            {startupProgress.name}
          </Grid>
          <Grid item xs={2}>
            {editMode && <Button>Ok</Button>}
          </Grid>
        </Grid>
      </h1>
      {startupProgress?.stages.map((stage, index) => (
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
        stageNumber={startupProgress?.stages.length + 1}
        onAddStage={handleAddStage}
      />
    </Box>
  );
}
