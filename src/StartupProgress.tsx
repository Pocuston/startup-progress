import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  addStage,
  addStep,
  deleteStage,
  deleteStep,
  editStartupName,
  EMPTY_STARTUP_PROGRESS,
  isStageUnlocked,
  resetProgress,
  StartupProgressModel,
  updateStep,
  editStageName,
} from "./model";
import Stage from "./Stage";
import AddStage from "./AddStage";
import RandomFact from "./RandomFact";
import StartupName from "./StartupName";
import { startupProgressTestData } from "./startupProgressTestData";
import { Grid } from "@mui/material";
import Menu from "./Menu";

const LOCAL_STORAGE_KEY = "startupProgress";

export default function StartupProgress() {
  const [startupProgress, setStartupProgress] = useState<StartupProgressModel>(
    () => {
      const localStorageValue = localStorage.getItem(LOCAL_STORAGE_KEY);

      return localStorageValue !== null
        ? JSON.parse(localStorageValue)
        : EMPTY_STARTUP_PROGRESS;
    }
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(startupProgress));
  }, [startupProgress]);

  function handleStepCompleteChange(
    stageId: string,
    stepId: string,
    completed: boolean
  ) {
    setStartupProgress((currentProgress) => {
      return updateStep(currentProgress, stageId, stepId, completed);
    });
  }

  function handleAddStage(name: string) {
    setStartupProgress((currentProgress) => {
      return addStage(currentProgress, name);
    });
  }

  function handleAddStep(stageId: string, name: string) {
    setStartupProgress((currentProgress) => {
      return addStep(currentProgress, stageId, name);
    });
  }

  function handleDeleteStage(stageId: string) {
    setStartupProgress((currentProgress) => {
      return deleteStage(currentProgress, stageId);
    });
  }

  function handleDeleteStep(stageId: string, stepId: string) {
    setStartupProgress((currentProgress) => {
      return deleteStep(currentProgress, stageId, stepId);
    });
  }

  function handleEditName(name: string) {
    setStartupProgress((currentProgress) => {
      return editStartupName(currentProgress, name);
    });
  }

  function handleResetProgress() {
    setStartupProgress((currentProgress) => {
      return resetProgress(currentProgress);
    });
  }

  function handleLoadTestData() {
    setStartupProgress(startupProgressTestData);
  }

  function handleEditStageName(stageId: string, name: string) {
    setStartupProgress((currentProgress) => {
      return editStageName(currentProgress, stageId, name);
    });
  }

  return (
    <Box>
      <Grid container>
        <Grid item xs={11}>
          <StartupName
            name={startupProgress.name}
            onEditName={handleEditName}
          />
        </Grid>
        <Grid item xs={1}>
          <Menu
            onResetProgress={handleResetProgress}
            onLoadTestData={handleLoadTestData}
          />
        </Grid>
      </Grid>

      {startupProgress?.stages.map((stage, index) => (
        <Stage
          stage={stage}
          stageNumber={index}
          onStepCompleteChange={handleStepCompleteChange}
          onAddStep={handleAddStep}
          onDeleteStage={handleDeleteStage}
          onDeleteStep={handleDeleteStep}
          onEditName={handleEditStageName}
          isUnlocked={isStageUnlocked(startupProgress, stage)}
          key={stage.id}
        />
      ))}

      <AddStage
        stageNumber={startupProgress?.stages.length + 1}
        onAddStage={handleAddStage}
        showForm={startupProgress?.stages.length === 0}
      />

      <RandomFact
        show={
          startupProgress?.stages.length > 0 &&
          startupProgress?.stages.every((stage) => stage.completed)
        }
      />
    </Box>
  );
}
