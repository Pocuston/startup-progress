import { StartupProgressModel } from "./model";

export const startupProgressTestData: StartupProgressModel = Object.freeze({
  name: "My Startup Progress",
  stages: [
    {
      id: "1",
      name: "Foundation",
      steps: [
        { id: "1", name: "Setup virtual office", completed: false },
        { id: "2", name: "Set mission & vision", completed: false },
        { id: "3", name: "Select business name", completed: false },
        { id: "4", name: "Buy domains", completed: false },
      ],
      completed: false,
    },
    {
      id: "2",
      name: "Discovery",
      steps: [
        { id: "1", name: "Create roadmap", completed: false },
        { id: "2", name: "Competitor analysis", completed: false },
      ],
      completed: false,
    },
    {
      id: "3",
      name: "Delivery",
      steps: [
        { id: "1", name: "Release marketing website", completed: false },
        { id: "2", name: "Release MVP", completed: false },
      ],
      completed: false,
    },
  ],
});
