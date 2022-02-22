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
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import CancelIcon from "@mui/icons-material/Cancel";

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
            <CancelIcon />
          </IconButton>
        </h2>
      </CardContent>
    </Card>
  );
}
