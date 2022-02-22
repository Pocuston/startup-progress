import { useEffect, useState } from "react";
import { Stage, StartupProgress } from "./model";
import { nanoid } from "nanoid";

//TODO presunout
const defaultStartupProgress: StartupProgress = {
  name: "My Startup Progress",
  stages: [
    {
      id: "1",
      name: "Foundation",
      steps: [
        { id: "1", name: "Set mission & vision", completed: false },
        { id: "2", name: "Setup virtual office", completed: false },
        { id: "3", name: "Select business name", completed: false },
        { id: "4", name: "Buy domains", completed: false },
      ],
      completed: false,
    },
    {
      id: "2",
      name: "Discovery",
      steps: [
        { id: "1", name: "Set mission & vision", completed: false },
        { id: "2", name: "Select business name", completed: false },
        { id: "3", name: "Setup virtual office", completed: false },
        { id: "4", name: "Buyd domains", completed: false },
      ],
      completed: false,
    },
    {
      id: "3",
      name: "Delivery",
      steps: [
        { id: "1", name: "Setup virtual office", completed: false },
        { id: "2", name: "Set mission & vision", completed: false },
        { id: "3", name: "Select business name", completed: false },
        { id: "4", name: "Buyd domains", completed: false },
      ],
      completed: false,
    },
  ],
};

const LOCAL_STORAGE_KEY = "startupProgress";

export default function useStartupProgressData(): [
  StartupProgress,
  (stageNumber: number, stepNumber: number, completed: boolean) => void,
  (name: string) => void,
  (stageId: string, name: string) => void
] {
  const [startupProgress, setStartupProgress] = useState<StartupProgress>(
    () => {
      const localStorageValue = localStorage.getItem(LOCAL_STORAGE_KEY);

      return localStorageValue !== null
        ? JSON.parse(localStorageValue)
        : defaultStartupProgress;
      //:  { name: "", stages: [] };
    }
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(startupProgress));
  }, [startupProgress]);

  //TODO predelat na stageId a stepId
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

  function handleAddStage(name: string) {
    setStartupProgress((currentProgress) => {
      const updatedProgress = { ...currentProgress };
      const newStage: Stage = {
        id: nanoid(),
        name,
        steps: [],
        completed: false,
      };
      updatedProgress.stages = [...currentProgress.stages, newStage];
      return updatedProgress;
    });
  }

  function handleAddStep(stageId: string, name: string) {
    setStartupProgress((currentProgress) => {
      const updatedProgress = { ...currentProgress };
      const stage = updatedProgress.stages.find(
        (stage) => stage.id === stageId
      );
      const newStep = {
        id: nanoid(),
        name,
        completed: false,
      };
      stage?.steps.push(newStep);
      return updatedProgress;
    });
  }

  function isStageComplete(stage: Stage): boolean {
    return stage.steps.every((step) => step.completed);
  }

  return [
    startupProgress,
    handleStepCompleteChange,
    handleAddStage,
    handleAddStep,
  ];
}
