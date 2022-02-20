import { useEffect, useState } from "react";
import { Stage, StartupProgress } from "./model";

const defaultStartupProgress: StartupProgress = {
  name: "My Startup Progress",
  stages: [
    {
      name: "Foundation",
      steps: [
        { name: "Set mission & vision", completed: false },
        { name: "Setup virtual office", completed: false },
        { name: "Select business name", completed: false },
        { name: "Buy domains", completed: false },
      ],
      completed: false,
    },
    {
      name: "Discovery",
      steps: [
        { name: "Set mission & vision", completed: false },
        { name: "Select business name", completed: false },
        { name: "Setup virtual office", completed: false },
        { name: "Buyd domains", completed: false },
      ],
      completed: false,
    },
    {
      name: "Delivery",
      steps: [
        { name: "Setup virtual office", completed: false },
        { name: "Set mission & vision", completed: false },
        { name: "Select business name", completed: false },
        { name: "Buyd domains", completed: false },
      ],
      completed: false,
    },
  ],
};

const LOCAL_STORAGE_KEY = "startupProgress";

export default function useStartupProgressData(): [
  StartupProgress,
  (stageNumber: number, stepNumber: number, completed: boolean) => void
] {
  const [startupProgress, setStartupProgress] = useState<StartupProgress>(
    () => {
      const localStorageValue = localStorage.getItem(LOCAL_STORAGE_KEY);

      return localStorageValue !== null
        ? JSON.parse(localStorageValue)
        : defaultStartupProgress;
    }
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(startupProgress));
  }, [startupProgress]);

  function handleStepCompleteChange(
    stageNumber: number,
    stepNumber: number,
    completed: boolean
  ) {
    setStartupProgress((currentProgress) => {
      const updatedProgress = { ...currentProgress };
      const stage = updatedProgress.stages[stageNumber];
      stage.steps[stepNumber].completed = completed;
      stage.completed = isStageComplete(stage);
      return updatedProgress;
    });
  }

  function isStageComplete(stage: Stage): boolean {
    return stage.steps.every((step) => step.completed);
  }

  return [startupProgress, handleStepCompleteChange];
}
