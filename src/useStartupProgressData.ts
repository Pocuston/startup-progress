import { useEffect, useState } from "react";
import {
  addStage,
  addStep,
  deleteStage,
  deleteStep,
  editStartupName,
  StartupProgress,
  updateStepCompleted,
} from "./model";

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
  (stageId: string, stepId: string, completed: boolean) => void,
  (name: string) => void,
  (stageId: string, name: string) => void,
  (stageId: string) => void,
  (stageId: string, stepId: string) => void,
  (name: string) => void
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
    stageId: string,
    stepId: string,
    completed: boolean
  ) {
    setStartupProgress((currentProgress) => {
      return updateStepCompleted(currentProgress, stageId, stepId, completed);
    });
  }

  function handleAddStage(name: string) {
    setStartupProgress((currentProgress) => {
      return addStage(currentProgress, name);
    });
  }

  function handleAddStep(stageId: string, name: string) {
    setStartupProgress((currentProgress) => {
      return addStep(currentProgress, stageId, name);
    });
  }

  function handleDeleteStage(stageId: string) {
    setStartupProgress((currentProgress) => {
      return deleteStage(currentProgress, stageId);
    });
  }

  function handleDeleteStep(stageId: string, stepId: string) {
    setStartupProgress((currentProgress) => {
      return deleteStep(currentProgress, stageId, stepId);
    });
  }

  function handleEditName(name: string) {
    setStartupProgress((currentProgress) => {
      return editStartupName(currentProgress, name);
    });
  }

  return [
    startupProgress,
    handleStepCompleteChange,
    handleAddStage,
    handleAddStep,
    handleDeleteStage,
    handleDeleteStep,
    handleEditName,
  ];
}
