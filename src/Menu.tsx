import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu as MuiMenu, MenuItem } from "@mui/material";
import * as React from "react";
import { MouseEvent } from "react";

export interface MenuProps {
  onResetProgress: () => void;
  onLoadTestData: () => void;
}

export default function Menu({ onResetProgress, onLoadTestData }: MenuProps) {
  const [menuAnchorElement, setMenuAnchorElement] =
    React.useState<Element | null>(null);
  const open = Boolean(menuAnchorElement);

  function handleMenuClick(event: MouseEvent) {
    setMenuAnchorElement(event.currentTarget);
  }

  function handleMenuClose() {
    setMenuAnchorElement(null);
  }

  function handleResetProgress() {
    onResetProgress();
    setMenuAnchorElement(null);
  }

  function handleLoadTestData() {
    onLoadTestData();
    setMenuAnchorElement(null);
  }

  return (
    <>
      <IconButton sx={{ marginTop: "22px" }} onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <MuiMenu
        open={open}
        anchorEl={menuAnchorElement}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleResetProgress} divider>
          Reset the progress
        </MenuItem>
        <MenuItem onClick={handleLoadTestData}>Load test data</MenuItem>
      </MuiMenu>
    </>
  );
}
