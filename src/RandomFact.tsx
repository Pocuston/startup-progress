import { Alert, Snackbar, Typography } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";

export interface RandomFactsProps {
  show: boolean;
}

export default function RandomFact({ show }: RandomFactsProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [randomFact, setRandomFact] = useState<string>();

  useEffect(() => {
    if (!show) {
      return;
    }

    async function fetchRandomFact() {
      const response = await fetch("https://uselessfacts.jsph.pl/random.json");
      const data = await response.json();
      setRandomFact(data.text);
      setSnackbarOpen(true);
    }

    fetchRandomFact();
  }, [show]);

  function handleRandomFactClose(event: any, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  }

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleRandomFactClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="info" onClose={handleRandomFactClose}>
        <Typography variant={"subtitle1"}>{randomFact}</Typography>
      </Alert>
    </Snackbar>
  );
}
