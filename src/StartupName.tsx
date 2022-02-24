import { IconButton, TextField, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import * as React from "react";
import { ChangeEvent, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export interface StartupNameProps {
  name: string;
  onEditName: (name: string) => void;
}

export default function StartupName({ name, onEditName }: StartupNameProps) {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);

  function handleEditStart() {
    setEditMode(true);
  }

  function handleEditCancel() {
    setEditMode(false);
    setEditedName(name);
  }

  function handleEdit() {
    onEditName(editedName);
    setEditMode(false);
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setEditedName(event.target.value);
  }

  return (
    <>
      <Typography variant={"h4"} sx={{ ml: 2, mt: 2 }}>
        {editMode ? (
          <>
            <TextField
              value={editedName}
              label="Startup name"
              autoFocus
              onChange={handleNameChange}
              inputProps={{ maxLength: 16, size: 25 }}
            />
            <IconButton
              onClick={handleEdit}
              disabled={name === ""}
              color={"primary"}
            >
              <CheckIcon />
            </IconButton>
            <IconButton onClick={handleEditCancel}>
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <>
            {name}
            <IconButton sx={{ ml: 2 }} onClick={handleEditStart}>
              <ModeEditIcon />
            </IconButton>
          </>
        )}
      </Typography>
    </>
  );
}
