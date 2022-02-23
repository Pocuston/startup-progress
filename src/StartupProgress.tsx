import * as React from "react";
import Box from "@mui/material/Box";
import {
  addStage,
  addStep,
  deleteStage,
  deleteStep,
  editStartupName,
  isStageUnlocked,
  updateStepCompleted,
  StartupProgressModel,
} from "./model";
import Stage from "./Stage";
import AddStage from "./AddStage";
import RandomFact from "./RandomFact";
import StartupName from "./StartupName";
import { useEffect, useState } from "react";
import { defaultStartupProgressTemplate } from "./defaultStartupProgressTemplate";

const LOCAL_STORAGE_KEY = "startupProgress";

export default function StartupProgress() {
  const [startupProgress, setStartupProgress] = useState<StartupProgressModel>(
    () => {
      const localStorageValue = localStorage.getItem(LOCAL_STORAGE_KEY);

      return localStorageValue !== null
        ? JSON.parse(localStorageValue)
        : defaultStartupProgressTemplate;
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
      return updateStepCompleted(currentProgress, stageId, stepId, completed);
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

  return (
    <Box>
      <StartupName name={startupProgress.name} onEditName={handleEditName} />
      {startupProgress?.stages.map((stage, index) => (
        <Stage
          stage={stage}
          stageNumber={index}
          onStepCompleteChange={handleStepCompleteChange}
          onAddStep={handleAddStep}
          onDeleteStage={handleDeleteStage}
          onDeleteStep={handleDeleteStep}
          isUnlocked={isStageUnlocked(startupProgress, stage)}
          key={stage.id}
        />
      ))}
      <AddStage
        stageNumber={startupProgress?.stages.length + 1}
        onAddStage={handleAddStage}
        showForm={startupProgress.stages.length === 0}
      />
      <RandomFact
        show={
          startupProgress.stages.length > 0 &&
          startupProgress.stages.every((stage) => stage.completed)
        }
      />
    </Box>
  );
}
