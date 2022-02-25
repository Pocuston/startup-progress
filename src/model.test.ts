import {
  addStage,
  addStep,
  deleteStage,
  deleteStep,
  editStageName,
  editStartupName,
  initializeProgress,
  isStageUnlocked,
  loadTestData,
  resetProgress,
  updateStep,
} from "./model";
import cloneDeep from "clone-deep";
import { startupProgressTestData } from "./startupProgressTestData";

describe("model.ts tests", () => {
  test("initialize() provides empty startup progress", () => {
    const emptyProgress = initializeProgress();

    expect(emptyProgress.name).toBe("My Startup Progress");
    expect(emptyProgress.stages).toEqual([]);
  });

  test("isStageUnlocked() provides correct value for all stages", () => {
    const progress = cloneDeep(startupProgressTestData);
    progress.stages[0].completed = true;
    progress.stages[0].steps.forEach((step) => (step.completed = true));

    expect(isStageUnlocked(progress, progress.stages[0])).toBe(false);
    expect(isStageUnlocked(progress, progress.stages[1])).toBe(true);
    expect(isStageUnlocked(progress, progress.stages[2])).toBe(false);
  });

  test("updateStep() updates both step and stage", () => {
    let progress = cloneDeep(startupProgressTestData);

    const firstStage = progress.stages[0];
    firstStage.steps.forEach((step) => {
      progress = updateStep(progress, firstStage.id, step.id, true);
    });

    firstStage.steps.forEach((step) => {
      expect(step.completed).toBe(true);
    });
    expect(firstStage.completed).toBe(true);
  });

  test("addStage() adds new stage to be the last one", () => {
    let progress = cloneDeep(startupProgressTestData);

    const newStageName = "New stage name";

    progress = addStage(progress, newStageName);

    const lastStage = progress.stages[progress.stages.length - 1];

    expect(lastStage.name).toBe(newStageName);
    expect(lastStage.steps).toEqual([]);
    expect(lastStage.completed).toBe(false);
  });

  test("addStep adds step to be tha last one in the correct stage", () => {
    let progress = cloneDeep(startupProgressTestData);

    const newStepName = "New step name";

    let stage = progress.stages[1];
    progress = addStep(progress, stage.id, newStepName);

    stage = progress.stages[1];
    const lastStepInStage = stage.steps[stage.steps.length - 1];

    expect(lastStepInStage.name).toBe(newStepName);
    expect(lastStepInStage.completed).toBe(false);
  });

  test("deleteStage() removes the correct stage", () => {
    let progress = cloneDeep(startupProgressTestData);

    const stageToBeDeleted = progress.stages[2];
    progress = deleteStage(progress, stageToBeDeleted.id);

    expect(
      progress.stages.find((stage) => stage.id === stageToBeDeleted.id)
    ).toBeUndefined();
  });

  test("deleteStep() removes the correct step from correct stage", () => {
    let progress = cloneDeep(startupProgressTestData);

    let stage = progress.stages[1];
    const stepToBeDeleted = stage.steps[0];
    progress = deleteStep(progress, stage.id, stepToBeDeleted.id);

    stage = progress.stages[1];

    expect(
      stage.steps.find((step) => step.id === stepToBeDeleted.id)
    ).toBeUndefined();
  });

  test("editStartupName() updates the new startup name", () => {
    let progress = cloneDeep(startupProgressTestData);

    const newStartupName = "New stage name";
    progress = editStartupName(progress, newStartupName);

    expect(progress.name).toBe(newStartupName);
  });

  test("resetProgress() sets all steps and stages to incomplete", () => {
    let progress = cloneDeep(startupProgressTestData);

    let firstStage = progress.stages[0];
    firstStage.steps.forEach((step) => {
      progress = updateStep(progress, firstStage.id, step.id, true);
    });

    progress = resetProgress(progress);

    firstStage = progress.stages[0];
    firstStage.steps.forEach((step) => {
      expect(step.completed).toBe(false);
    });
    expect(firstStage.completed).toBe(false);
  });

  test("editStageName() updates the new stage name", () => {
    let progress = cloneDeep(startupProgressTestData);

    let stage = progress.stages[0];
    const newStageName = "New stage name";
    progress = editStageName(progress, stage.id, newStageName);

    stage = progress.stages[0];
    expect(stage.name).toBe(newStageName);
  });

  test("loadTestData provides correct test data", () => {
    const progress = loadTestData();

    expect(progress).toEqual(startupProgressTestData);
  });
});
