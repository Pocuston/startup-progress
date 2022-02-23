import { nanoid } from "nanoid";

export interface Stage {
  id: string;
  name: string;
  steps: Step[];
  completed: boolean;
}

export interface Step {
  id: string;
  name: string;
  completed: boolean;
}

export interface StartupProgress {
  name: string;
  stages: Stage[];
}

export function isStageUnlocked(
  startupProgress: StartupProgress,
  stage: Stage
): boolean {
  const stageNumber = startupProgress.stages.findIndex(
    (s) => s.id === stage.id
  );
  return (
    !stage.completed &&
    (stageNumber === 0 || startupProgress.stages[stageNumber - 1]?.completed)
  );
}

export function updateStepCompleted(
  currentProgress: StartupProgress,
  stageId: string,
  stepId: string,
  completed: boolean
): StartupProgress {
  const updatedProgress = { ...currentProgress };
  const stage = updatedProgress.stages.find((stage) => stage.id === stageId);
  const step = stage?.steps.find((step) => step.id === stepId);
  if (stage !== undefined && step !== undefined) {
    step.completed = completed;
    stage.completed = isStageComplete(stage);
  }

  return updatedProgress;
}

export function isStageComplete(stage: Stage): boolean {
  return stage.steps.every((step) => step.completed);
}

export function addStage(currentProgress: StartupProgress, name: string) {
  const updatedProgress = { ...currentProgress };
  const newStage: Stage = {
    id: nanoid(),
    name,
    steps: [],
    completed: false,
  };
  updatedProgress.stages = [...currentProgress.stages, newStage];
  return updatedProgress;
}

export function addStep(
  currentProgress: StartupProgress,
  stageId: string,
  name: string
) {
  const updatedProgress = { ...currentProgress };
  const stage = updatedProgress.stages.find((stage) => stage.id === stageId);
  const newStep = {
    id: nanoid(),
    name,
    completed: false,
  };
  stage?.steps.push(newStep);
  return updatedProgress;
}

export function deleteStage(currentProgress: StartupProgress, stageId: string) {
  const updatedProgress = { ...currentProgress };
  updatedProgress.stages = updatedProgress.stages.filter(
    (stage) => stage.id !== stageId
  );
  return updatedProgress;
}

export function deleteStep(
  currentProgress: StartupProgress,
  stageId: string,
  stepId: string
) {
  const updatedProgress = { ...currentProgress };
  const stage = updatedProgress.stages.find((stage) => stage.id === stageId);
  if (stage !== undefined) {
    stage.steps = stage.steps.filter((step) => step.id !== stepId);
  }

  return updatedProgress;
}

export function editStartupName(
  currentProgress: StartupProgress,
  name: string
) {
  return { ...currentProgress, name };
}
