import { StageModel } from "./model";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import { ChangeEvent, useState } from "react";
import StageStep from "./StageStep";
import AddStep from "./AddStep";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export interface StageProps {
  stage: StageModel;
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
  onEditName: (stageId: string, name: string) => void;
}

export default function Stage({
  stage,
  stageNumber,
  isUnlocked,
  onStepCompleteChange,
  onAddStep,
  onDeleteStage,
  onDeleteStep,
  onEditName,
}: StageProps) {
  const [isAddInProgress, setIsAddInProgress] = useState(false);
  const [isEditInProgress, setIsEditInProgress] = useState(false);
  const [editedName, setEditedName] = useState(stage.name);

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

  function handleEditedNameChange(event: ChangeEvent<HTMLInputElement>) {
    setEditedName(event.target.value);
  }

  function handleEditStart() {
    setIsEditInProgress(true);
  }

  function handleEditName() {
    onEditName(stage.id, editedName);
    setIsEditInProgress(false);
  }

  function handleCancelEdit() {
    setEditedName(stage.name);
    setIsEditInProgress(false);
  }

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <h2>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Chip
                label={stageNumber + 1}
                color={stage.completed ? "success" : "primary"}
              />{" "}
              {isEditInProgress ? (
                <>
                  <TextField
                    value={editedName}
                    size="small"
                    label="Edit stage name"
                    autoFocus={true}
                    onChange={handleEditedNameChange}
                    required={true}
                    inputProps={{ maxLength: 25, size: 22 }}
                  />{" "}
                  <IconButton
                    onClick={handleEditName}
                    disabled={editedName === ""}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton onClick={handleCancelEdit}>
                    <CloseIcon />
                  </IconButton>
                </>
              ) : (
                <>{stage.name}</>
              )}
            </Grid>
            <Grid item xs={3}>
              {stage.completed && (
                <CheckCircleIcon color="success" fontSize="large" />
              )}
              {!stage.completed && !isEditInProgress && (
                <>
                  <IconButton onClick={handleEditStart}>
                    <ModeEditIcon sx={{ color: "secondary.light" }} />
                  </IconButton>

                  <IconButton onClick={handleDelete}>
                    <DeleteIcon sx={{ color: "secondary.light" }} />
                  </IconButton>
                </>
              )}
            </Grid>
          </Grid>
        </h2>
        <div>
          {stage.steps.map((step) => (
            <StageStep
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
          {!stage.completed && (
            <Button
              onClick={handleAddStepStart}
              disabled={isAddInProgress}
              startIcon={<AddIcon />}
            >
              Add step
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
