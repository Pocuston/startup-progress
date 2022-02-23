import * as React from "react";
import { ChangeEvent, useState } from "react";
import { Box, Checkbox, IconButton, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export interface AddStepProps {
  stageId: string;
  onAddStep: (stageId: string, name: string) => void;
  onCancel: () => void;
}

export default function AddStep({
  stageId,
  onAddStep,
  onCancel,
}: AddStepProps) {
  const [name, setName] = useState("");

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleAddStep() {
    onAddStep(stageId, name);
    setName("");
  }

  function handleCancel() {
    onCancel();
    setName("");
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
        inputProps={{ maxLength: 35, size: 35 }}
      />
      <IconButton
        onClick={handleAddStep}
        disabled={name === ""}
        color={"primary"}
      >
        <CheckIcon />
      </IconButton>
      <IconButton onClick={handleCancel}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
