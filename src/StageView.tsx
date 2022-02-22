import { Stage } from "./model";
import {
  Card,
  CardContent,
  Chip,
  Grid,
  Box,
  TextField,
  Button,
  Checkbox,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import * as React from "react";
import StepView from "./StepView";
import { ChangeEvent, useState } from "react";

export interface AddStepProps {
  stageId: string;
  onAddStep: (stageId: string, name: string) => void;
  onCancel: () => void;
}

export function AddStep({ stageId, onAddStep, onCancel }: AddStepProps) {
  const [name, setName] = useState("");

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleAddStep() {
    onAddStep(stageId, name);
    setName("");
  }

  function handleCancelClick() {
    setName("");
    onCancel();
  }

  return (
    <Box>
      <Checkbox checked={false} disabled={true} />
      <TextField
        value={name}
        size="small"
        label="New step name"
        autoFocus
        onChange={handleNameChange}
      />{" "}
      <IconButton
        onClick={handleAddStep}
        disabled={name === ""}
        color={"primary"}
      >
        <CheckIcon />
      </IconButton>
      <IconButton onClick={handleCancelClick}>
        <CancelIcon />
      </IconButton>
    </Box>
  );
}

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

//TODO: rename
export default function StageView({
  stage,
  stageNumber,
  isUnlocked,
  onStepCompleteChange,
  onAddStep,
}: StageViewProps) {
  const [isAddInProgress, setIsAddInProgress] = useState(false);

  function handleStepComplete(stepNumber: number, completed: boolean) {
    onStepCompleteChange(stageNumber, stepNumber, completed);
  }

  function handleAddStepStart() {
    setIsAddInProgress(true);
  }

  function handleAddCancel() {
    setIsAddInProgress(false);
  }

  function handleAddStep(stageId: string, name: string) {
    onAddStep(stageId, name);
    setIsAddInProgress(false);
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
          {isAddInProgress && (
            <AddStep
              stageId={stage.id}
              onAddStep={handleAddStep}
              onCancel={handleAddCancel}
            />
          )}
          <Button
            onClick={handleAddStepStart}
            disabled={isAddInProgress}
            startIcon={<AddIcon />}
          >
            Add step
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
