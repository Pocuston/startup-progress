import { Step } from "./model";
import * as React from "react";
import { ChangeEvent } from "react";
import { Checkbox, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export interface StepViewProps {
  step: Step;
  stepNumber: number;
  onStepCompleteChange: (stepNumber: number, completed: boolean) => void;
  onDeleteStep: (stepId: string) => void;
  enableCheckbox: boolean;
  enableDelete: boolean;
}

//TODO: rename
export default function StepView({
  step,
  stepNumber,
  onStepCompleteChange,
  onDeleteStep,
  enableCheckbox,
  enableDelete,
}: StepViewProps) {
  function handleCompleted(event: ChangeEvent<HTMLInputElement>) {
    onStepCompleteChange(stepNumber, event.target.checked);
  }

  function handleDelete() {
    onDeleteStep(step.id);
  }

  return (
    <Grid container>
      <Grid item xs={10}>
        <Checkbox
          checked={step.completed}
          onChange={handleCompleted}
          disabled={!enableCheckbox}
        />

        {step.name}
      </Grid>
      <Grid item xs={2}>
        {enableDelete && (
          <IconButton onClick={handleDelete} sx={{ ml: 1.5 }}>
            <DeleteIcon />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
}
