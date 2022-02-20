import { Step } from "./model";
import { ChangeEvent } from "react";
import { Checkbox } from "@mui/material";
import * as React from "react";

export interface StepViewProps {
  step: Step;
  stepNumber: number;
  onStepCompleteChange: (stepNumber: number, completed: boolean) => void;
  enableCheckbox: boolean;
}

export default function StepView({
  step,
  stepNumber,
  onStepCompleteChange,
  enableCheckbox,
}: StepViewProps) {
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
