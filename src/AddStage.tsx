import { ChangeEvent, useState } from "react";
import { Button, Card, CardContent, Chip, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import * as React from "react";

export interface AddStageProps {
  stageNumber: number;
  onAddStage: (name: string) => void;
}

export default function AddStage({ stageNumber, onAddStage }: AddStageProps) {
  const [name, setName] = useState<string>("");

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleAddStage() {
    onAddStage(name);
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
            onChange={handleNameChange}
          />{" "}
          <Button
            onClick={handleAddStage}
            variant="contained"
            disabled={name === ""}
          >
            Add stage
          </Button>
        </h2>
      </CardContent>
    </Card>
  );
}
