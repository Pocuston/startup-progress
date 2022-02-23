import { Step } from "./model";
import * as React from "react";
import { ChangeEvent, useState } from "react";
import { Checkbox, Grid, IconButton, Toolbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";

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
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  function handleCompleted(event: ChangeEvent<HTMLInputElement>) {
    onStepCompleteChange(stepNumber, event.target.checked);
  }

  function handleDelete() {
    onDeleteStep(step.id);
  }

  function handleMouseEnter() {
    setShowDeleteButton(true);
  }

  function handleMouseLeave() {
    setShowDeleteButton(false);
  }

  return (
    <Grid
      container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
          <IconButton
            onClick={handleDelete}
            sx={{ marginLeft: "17px", color: "secondary.light" }}
            size="small"
          >
            <ClearIcon fontSize={"small"} />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
}
