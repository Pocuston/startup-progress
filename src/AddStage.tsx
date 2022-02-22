import * as React from "react";
import { ChangeEvent, useState } from "react";
import { Card, CardContent, Chip, IconButton, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export interface AddStageProps {
  stageNumber: number;
  onAddStage: (name: string) => void;
  onCancel: () => void;
}

export default function AddStage({
  stageNumber,
  onAddStage,
  onCancel,
}: AddStageProps) {
  const [name, setName] = useState<string>("");

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleAddStage() {
    onAddStage(name);
    setName("");
  }

  function handleCancel() {
    onCancel();
    setName("");
  }

  return (
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
  );
}
