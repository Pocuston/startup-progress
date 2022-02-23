import { Step } from "./model";
import * as React from "react";
import { ChangeEvent } from "react";
import { Checkbox, Grid, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export interface StepViewProps {
  step: Step;
  onStepCompleteChange: (stepId: string, completed: boolean) => void;
  onDeleteStep: (stepId: string) => void;
  enableCheckbox: boolean;
  enableDelete: boolean;
}

//TODO: rename
export default function StepView({
  step,
  onStepCompleteChange,
  onDeleteStep,
  enableCheckbox,
  enableDelete,
}: StepViewProps) {
  function handleCompleted(event: ChangeEvent<HTMLInputElement>) {
    onStepCompleteChange(step.id, event.target.checked);
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
