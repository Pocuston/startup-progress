import { Stage } from "./model";
import { Card, CardContent, Chip, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as React from "react";
import StepView from "./StepView";

export interface StageViewProps {
  stage: Stage;
  stageNumber: number;
  isUnlocked: boolean;
  onStepCompleteChange: (
    stageNumber: number,
    stepNumber: number,
    completed: boolean
  ) => void;
}

export default function StageView({
  stage,
  stageNumber,
  isUnlocked,
  onStepCompleteChange,
}: StageViewProps) {
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
