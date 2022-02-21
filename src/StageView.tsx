import { Stage } from "./model";
import {
  Card,
  CardContent,
  Chip,
  Grid,
  Box,
  TextField,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as React from "react";
import StepView from "./StepView";
import { ChangeEvent, useState } from "react";

export interface StageViewProps {
  stage: Stage;
  stageNumber: number;
  isUnlocked: boolean;
  onStepCompleteChange: (
    stageNumber: number,
    stepNumber: number,
    completed: boolean
  ) => void;
  onAddStep: (stageId: string, name: string) => void;
}

export interface AddStepProps {
  stageId: string;
  onAddStep: (stageId: string, name: string) => void;
}

export function AddStep({ stageId, onAddStep }: AddStepProps) {
  const [name, setName] = useState<string>("");

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleAddStep() {
    onAddStep(stageId, name);
    setName("");
  }

  return (
    <Box>
      <TextField
        value={name}
        size="small"
        label="New step name"
        onChange={handleNameChange}
      />{" "}
      <Button
        onClick={handleAddStep}
        variant="contained"
        disabled={name === ""}
      >
        Add step
      </Button>
    </Box>
  );
}

//TODO: rename
export default function StageView({
  stage,
  stageNumber,
  isUnlocked,
  onStepCompleteChange,
  onAddStep,
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
          <AddStep stageId={stage.id} onAddStep={onAddStep} />
        </div>
      </CardContent>
    </Card>
  );
}
