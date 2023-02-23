import { PerspectiveCamera, Scene } from "three";

export interface PlaygroundInterface {
  getScene(): Scene;
  getCamera(): PerspectiveCamera;
  animate(): Promise<void>;
  init(): Promise<void>;
}