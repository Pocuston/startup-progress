import * as React from "react";
import { ChangeEvent } from "react";
import Box from "@mui/material/Box";
import { Card, CardContent, Chip, Checkbox, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { StartupProgress, Stage, Step } from "./model";

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
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <h2>
              <Chip
                label={stageNumber + 1}
                color={stage.completed ? "success" : "primary"}
              />{" "}
              {stage.name}
            </h2>
          </Grid>
          <Grid item xs={2}>
            {stage.completed && (
              <CheckCircleIcon
                color="success"
                sx={{ margin: 2 }}
                fontSize="large"
              />
            )}
          </Grid>
        </Grid>

        <div>
          {stage.steps.map((step, index) => (
            <StepView
              step={step}
              stepNumber={index}
              onStepCompleteChange={handleStepComplete}
              enableCheckbox={isUnlocked}
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
  enableCheckbox,
}: {
  step: Step;
  stepNumber: number;
  onStepCompleteChange: (stepNumber: number, completed: boolean) => void;
  enableCheckbox: boolean;
}) {
  function handleCompleted(event: ChangeEvent<HTMLInputElement>) {
    onStepCompleteChange(stepNumber, event.target.checked);
  }

  return (
    <div>
      <Checkbox
        checked={step.completed}
        onChange={handleCompleted}
        disabled={!enableCheckbox}
      />
      {step.name}
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
