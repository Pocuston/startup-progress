import * as React from "react";
import Box from "@mui/material/Box";
import { isStageUnlocked } from "./model";
import StageView from "./StageView";
import useStartupProgressData from "./useStartupProgressData";
import AddStage from "./AddStage";
import RandomFact from "./RandomFact";
import StartupName from "./StartupName";

//TODO veci z hooku do modelu
export default function ProgressView() {
  const [
    startupProgress,
    handleStepCompleteChange,
    handleAddStage,
    handleAddStep,
    handleDeleteStage,
    handleDeleteStep,
    handleEditName,
  ] = useStartupProgressData();

  return (
    <Box>
      <StartupName name={startupProgress.name} onEditName={handleEditName} />
      {startupProgress?.stages.map((stage, index) => (
        <StageView
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
