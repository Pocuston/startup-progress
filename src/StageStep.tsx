import { StepModel } from "./model";
import * as React from "react";
import { ChangeEvent } from "react";
import { Checkbox, Grid, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export interface StageStepProps {
  step: StepModel;
  onStepCompleteChange: (stepId: string, completed: boolean) => void;
  onDeleteStep: (stepId: string) => void;
  enableCheckbox: boolean;
  enableDelete: boolean;
}

export default function StageStep({
  step,
  onStepCompleteChange,
  onDeleteStep,
  enableCheckbox,
  enableDelete,
}: StageStepProps) {
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
