import { PlaygroundInterface } from '../interfaces/PlaygroundInterface';
import { PlaygroundOptions } from '../types/PlaygroundOptions';
import { PerspectiveCamera, Scene } from 'three';

export abstract class Playground implements PlaygroundInterface {
  protected scene: Scene;
  protected camera: PerspectiveCamera;

  constructor(protected readonly options: Partial<PlaygroundOptions>) {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      this.options.cameraFov || 75,
      this.options.width / this.options.height,
      this.options.cameraNear || 0.1,
      this.options.cameraFar || 1000 );
  }

  getCamera(): PerspectiveCamera {
    return this.camera;
  }

  getScene(): Scene {
    return this.scene;
  }

  abstract animate(): Promise<void>;
  abstract init(): Promise<void>;
}