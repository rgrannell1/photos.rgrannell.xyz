
export interface IExperiment {
  setup(): void;
  run(): void;
  teardown(): void;
}
