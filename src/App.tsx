import * as React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ProgressView from "./ProgressView";
import useStartupProgressData from "./useStartupProgressData";
import Alert from "@mui/material/Alert";

export default function App() {
  const [startupProgressData, handleStepCompleteChange] =
    useStartupProgressData();
  const [randomFact, setRandomFact] = useState<string | null>(null);
  const [randomFactDisplayed, setRandomFactDisplayed] = useState(false);

  useEffect(() => {
    if (randomFactDisplayed || !areAllStagesCompleted()) {
      return;
    }

    async function fetchRandomFact() {
      const response = await fetch("https://uselessfacts.jsph.pl/random.json");
      const data = await response.json();
      setRandomFact(data.text);
      setRandomFactDisplayed(true);
    }
    fetchRandomFact();
  }, [randomFactDisplayed, areAllStagesCompleted()]);

  function areAllStagesCompleted() {
    return startupProgressData.stages.every((stage) => stage.completed);
  }

  return (
    <Container maxWidth="sm">
      {startupProgressData !== null && (
        <ProgressView
          startupProgress={startupProgressData}
          onStepComplete={handleStepCompleteChange}
        />
      )}
      {randomFact !== null && <Alert>{randomFact}</Alert>}
    </Container>
  );
}
