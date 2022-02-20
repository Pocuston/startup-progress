import * as React from "react";
import Container from "@mui/material/Container";
import ProgressView from "./ProgressView";
import useStartupProgressData from "./useStartupProgressData";

export default function App() {
  const [startupProgressData, handleStepCompleteChange] =
    useStartupProgressData();

  return (
    <Container maxWidth="sm">
      {startupProgressData !== null && (
        <ProgressView
          startupProgress={startupProgressData}
          onStepComplete={handleStepCompleteChange}
        />
      )}
    </Container>
  );
}
