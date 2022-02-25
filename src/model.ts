import { nanoid } from "nanoid";
import { startupProgressTestData } from "./startupProgressTestData";
import cloneDeep from "clone-deep";

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

/**
 * Returns true if the stage is unlocked, i.e. all previous stages are completed
 * @param startupProgress
 * @param stage
 */
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

/**
 * Sets step as complete or incomplete and returns updated {@link StartupProgressModel}
 * @param currentProgress
 * @param stageId
 * @param stepId
 * @param completed
 */
export function updateStep(
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

/**
 * Returns true if the stage is completed, i.e. all steps are completed
 * @param stage
 */
export function isStageComplete(stage: StageModel): boolean {
  return stage.steps.every((step) => step.completed);
}

/**
 * Adds new stage and returns updated {@link StartupProgressModel}
 * @param currentProgress
 * @param name
 */
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

/**
 * Adds new step to stage and returns updated {@link StartupProgressModel}
 * @param currentProgress
 * @param stageId
 * @param name
 */
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

/**
 * Deletes stage and returns updated {@link StartupProgressModel}
 * @param currentProgress
 * @param stageId
 */
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

/**
 * Deletes step and returns updated {@link StartupProgressModel}
 * @param currentProgress
 * @param stageId
 * @param stepId
 */
export function deleteStep(
  currentProgress: StartupProgressModel,
  stageId: string,
  stepId: string
) {
  const updatedProgress = { ...currentProgress };
  const stage = updatedProgress.stages.find((s) => s.id === stageId);
  if (stage !== undefined) {
    stage.steps = stage.steps.filter((s) => s.id !== stepId);
    stage.completed = isStageComplete(stage);
  }

  return updatedProgress;
}

/**
 * Updateds startup name and returns updated {@link StartupProgressModel}
 * @param currentProgress
 * @param name
 */
export function editStartupName(
  currentProgress: StartupProgressModel,
  name: string
) {
  return { ...currentProgress, name };
}

/**
 * Resets current progress, i.e. sets all steps of all stages to incomplete and returns updated {@link StartupProgressModel}
 * @param currentProgress
 */
export function resetProgress(currentProgress: StartupProgressModel) {
  const updatedProgress = { ...currentProgress };
  updatedProgress.stages.forEach((stage) => {
    stage.steps.forEach((step) => (step.completed = false));
    stage.completed = false;
  });
  return updatedProgress;
}

/**
 * Updates name of stage and returns updated {@link StartupProgressModel}
 * @param currentProgress
 * @param stageId
 * @param name
 */
export function editStageName(
  currentProgress: StartupProgressModel,
  stageId: string,
  name: string
) {
  const updatedProgress = { ...currentProgress };
  const stage = updatedProgress.stages.find((s) => s.id === stageId);
  if (stage !== undefined) {
    stage.name = name;
  }
  return updatedProgress;
}

/**
 * Loads startup progress from test data at {@link startupProgressTestData}
 */
export function loadTestData() {
  return cloneDeep(startupProgressTestData);
}
