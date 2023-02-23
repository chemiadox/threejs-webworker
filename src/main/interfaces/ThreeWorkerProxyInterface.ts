import { ThreeWorkerInterface } from './ThreeWorkerInterface';

export interface ThreeWorkerProxyInterface extends ThreeWorkerInterface {
  run(): void;
  toggle(canvasId: string): void;
}