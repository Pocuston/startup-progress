export interface Stage {
  id?: string;
  name: string;
  steps: Step[];
  completed: boolean;
}

export interface Step {
  id?: string;
  name: string;
  completed: boolean;
}

export interface StartupProgress {
  name: string;
  stages: Stage[];
}
