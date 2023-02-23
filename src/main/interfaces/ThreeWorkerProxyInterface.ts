interface ThreeWorkerProxyInterface extends ThreeWorkerInterface {
  run(): void;
  toggle(canvasId: string): void;
}