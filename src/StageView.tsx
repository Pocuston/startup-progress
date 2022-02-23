import { Stage } from "./model";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import { useState } from "react";
import StepView from "./StepView";
import AddStep from "./AddStep";

export interface StageViewProps {
  stage: Stage;
  stageNumber: number;
  isUnlocked: boolean;
  onStepCompleteChange: (
    stageId: string,
    stepId: string,
    completed: boolean
  ) => void;
  onAddStep: (stageId: string, name: string) => void;
  onDeleteStage: (stageId: string) => void;
  onDeleteStep: (stageId: string, stepId: string) => void;
}

//TODO: rename
export default function StageView({
  stage,
  stageNumber,
  isUnlocked,
  onStepCompleteChange,
  onAddStep,
  onDeleteStage,
  onDeleteStep,
}: StageViewProps) {
  const [isAddInProgress, setIsAddInProgress] = useState(false);

  function handleStepComplete(stepId: string, completed: boolean) {
    onStepCompleteChange(stage.id, stepId, completed);
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

  function handleDelete() {
    onDeleteStage(stage.id);
  }

  function handleDeleteStep(stepId: string) {
    onDeleteStep(stage.id, stepId);
  }

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <h2>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Chip
                label={stageNumber + 1}
                color={stage.completed ? "success" : "primary"}
              />{" "}
              {stage.name}
            </Grid>
            <Grid item xs={2}>
              {stage.completed && (
                <CheckCircleIcon color="success" fontSize="large" />
              )}
              {!stage.completed && (
                <IconButton onClick={handleDelete}>
                  <DeleteIcon sx={{ color: "secondary.light" }} />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </h2>
        <div>
          {stage.steps.map((step) => (
            <StepView
              step={step}
              onStepCompleteChange={handleStepComplete}
              onDeleteStep={handleDeleteStep}
              enableCheckbox={isUnlocked}
              enableDelete={!stage.completed && !step.completed}
              key={step.id}
            />
          ))}
          {isAddInProgress && (
            <AddStep
              stageId={stage.id}
              onAddStep={handleAddStep}
              onCancel={handleAddCancel}
            />
          )}
          <Grid container spacing={2}>
            <Grid item xs={10}>
              {!stage.completed && (
                <Button
                  onClick={handleAddStepStart}
                  disabled={isAddInProgress}
                  startIcon={<AddIcon />}
                >
                  Add step
                </Button>
              )}
            </Grid>
            <Grid item xs={2}>
              {/*{!stage.completed && (*/}
              {/*  <IconButton onClick={handleDelete} size="small">*/}
              {/*    <DeleteIcon sx={{ color: "secondary.light" }} />*/}
              {/*  </IconButton>*/}
              {/*)}*/}
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}
