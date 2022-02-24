import { nanoid } from "nanoid";

export interface StageModel {
  id: string;
  name: string;
  steps: StepModel[];
  completed: boolean;
}

export interface StepModel {
  id: string;
  name: string;
  completed: boolean;
}

export interface StartupProgressModel {
  name: string;
  stages: StageModel[];
}

export const EMPTY_STARTUP_PROGRESS: StartupProgressModel = {
  name: "My Startup Progress",
  stages: [],
};

export function isStageUnlocked(
  startupProgress: StartupProgressModel,
  stage: StageModel
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
  currentProgress: StartupProgressModel,
  stageId: string,
  stepId: string,
  completed: boolean
): StartupProgressModel {
  const updatedProgress = { ...currentProgress };
  const stage = updatedProgress.stages.find((s) => s.id === stageId);
  const step = stage?.steps.find((s) => s.id === stepId);
  if (stage !== undefined && step !== undefined) {
    step.completed = completed;
    stage.completed = isStageComplete(stage);
  }

  return updatedProgress;
}

export function isStageComplete(stage: StageModel): boolean {
  return stage.steps.every((step) => step.completed);
}

export function addStage(currentProgress: StartupProgressModel, name: string) {
  const updatedProgress = { ...currentProgress };
  const newStage: StageModel = {
    id: nanoid(),
    name,
    steps: [],
    completed: false,
  };
  updatedProgress.stages = [...currentProgress.stages, newStage];
  return updatedProgress;
}

export function addStep(
  currentProgress: StartupProgressModel,
  stageId: string,
  name: string
) {
  const updatedProgress = { ...currentProgress };
  const stage = updatedProgress.stages.find((s) => s.id === stageId);
  const newStep = {
    id: nanoid(),
    name,
    completed: false,
  };
  stage?.steps.push(newStep);
  return updatedProgress;
}

export function deleteStage(
  currentProgress: StartupProgressModel,
  stageId: string
) {
  const updatedProgress = { ...currentProgress };
  updatedProgress.stages = updatedProgress.stages.filter(
    (stage) => stage.id !== stageId
  );
  return updatedProgress;
}

export function deleteStep(
  currentProgress: StartupProgressModel,
  stageId: string,
  stepId: string
) {
  const updatedProgress = { ...currentProgress };
  const stage = updatedProgress.stages.find((s) => s.id === stageId);
  if (stage !== undefined) {
    stage.steps = stage.steps.filter((s) => s.id !== stepId);
  }

  return updatedProgress;
}

export function editStartupName(
  currentProgress: StartupProgressModel,
  name: string
) {
  return { ...currentProgress, name };
}

export function resetProgress(currentProgress: StartupProgressModel) {
  const updatedProgress = { ...currentProgress };
  updatedProgress.stages.forEach((stage) => {
    stage.steps.forEach((step) => (step.completed = false));
    stage.completed = false;
  });
  return updatedProgress;
}
