import * as React from "react";
import Box from "@mui/material/Box";
import { StartupProgress, Stage, Step } from "./model";
import { Card, CardContent, Typography } from "@mui/material";
import { ChangeEvent } from "react";

export interface ProgressViewProps {
  startupProgress: StartupProgress;
  onStepComplete: (
    stageNumber: number,
    stepNumber: number,
    completed: boolean
  ) => void;
}

function StageView({
  stage,
  stageNumber,
  isUnlocked,
  onStepCompleteChange,
}: {
  stage: Stage;
  stageNumber: number;
  isUnlocked: boolean;
  onStepCompleteChange: (
    stageNumber: number,
    stepNumber: number,
    completed: boolean
  ) => void;
}) {
  function handleStepComplete(stepNumber: number, completed: boolean) {
    onStepCompleteChange(stageNumber, stepNumber, completed);
  }

  return (
    <Card sx={{ margin: 1 }}>
      <CardContent>
        <h2>{stage.name}</h2>
        <div>
          {stage.steps.map((step, index) => (
            <StepView
              step={step}
              stepNumber={index}
              onStepCompleteChange={handleStepComplete}
              showCheckbox={isUnlocked}
              key={index}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StepView({
  step,
  stepNumber,
  onStepCompleteChange,
  showCheckbox,
}: {
  step: Step;
  stepNumber: number;
  onStepCompleteChange: (stepNumber: number, completed: boolean) => void;
  showCheckbox: boolean;
}) {
  function handleCompleted(event: ChangeEvent<HTMLInputElement>) {
    onStepCompleteChange(stepNumber, event.target.checked);
  }

  return (
    <div>
      {step.name}{" "}
      {showCheckbox && (
        <input
          type="checkbox"
          checked={step.completed}
          onChange={handleCompleted}
        />
      )}{" "}
    </div>
  );
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
