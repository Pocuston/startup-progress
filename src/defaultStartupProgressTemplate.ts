import { StartupProgressModel } from "./model";

export const defaultStartupProgressTemplate: StartupProgressModel = {
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
