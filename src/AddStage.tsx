import * as React from "react";
import { ChangeEvent, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

export interface AddStageProps {
  stageNumber: number;
  onAddStage: (name: string) => void;
  showForm: boolean;
}

export default function AddStage({
  stageNumber,
  onAddStage,
  showForm,
}: AddStageProps) {
  const [name, setName] = useState<string>("");
  const [isAddStageInProgress, setIsAddStageInProgress] = useState(showForm);

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleAddStage() {
    onAddStage(name);
    setName("");
    setIsAddStageInProgress(false);
  }

  function handleCancel() {
    setName("");
    setIsAddStageInProgress(false);
  }

  function handleAddStageStart() {
    setIsAddStageInProgress(true);
  }

  return (
    <>
      {isAddStageInProgress && (
        <Card sx={{ margin: 2 }}>
          <CardContent>
            <h2>
              <Chip label={stageNumber} color={"default"} />{" "}
              <TextField
                value={name}
                size="small"
                label="New stage name"
                autoFocus={true}
                onChange={handleNameChange}
                required={true}
                inputProps={{ maxLength: 25, size: 25 }}
              />{" "}
              <IconButton onClick={handleAddStage} disabled={name === ""}>
                <CheckIcon />
              </IconButton>
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            </h2>
          </CardContent>
        </Card>
      )}
      <Button
        sx={{ ml: 2 }}
        onClick={handleAddStageStart}
        disabled={isAddStageInProgress}
        startIcon={<AddIcon />}
      >
        Add stage
      </Button>
    </>
  );
}
