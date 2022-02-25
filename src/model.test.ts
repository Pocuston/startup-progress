import {
  addStage,
  initializeProgress,
  isStageUnlocked,
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
});
