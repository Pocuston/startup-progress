import * as React from "react";
import Container from "@mui/material/Container";
import ProgressView from "./ProgressView";

export default function App() {
  // const [randomFact, setRandomFact] = useState<string | null>(null);
  // const [randomFactDisplayed, setRandomFactDisplayed] = useState(false);

  // useEffect(() => {
  //   if (randomFactDisplayed || !areAllStagesCompleted()) {
  //     return;
  //   }
  //
  //   async function fetchRandomFact() {
  //     const response = await fetch("https://uselessfacts.jsph.pl/random.json");
  //     const data = await response.json();
  //     setRandomFact(data.text);
  //     setRandomFactDisplayed(true);
  //   }
  //   fetchRandomFact();
  // }, [randomFactDisplayed, areAllStagesCompleted()]);
  //
  // function areAllStagesCompleted() {
  //   return startupProgressData.stages.every((stage) => stage.completed);
  // }

  return (
    <Container maxWidth="sm">
      <ProgressView />

      {/*{randomFact !== null && <Alert>{randomFact}</Alert>}*/}
    </Container>
  );
}
