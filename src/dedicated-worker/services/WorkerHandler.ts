import { WorkerRenderer } from './WorkerRenderer';
import { DefaultPlayground } from '../playgrounds/DefaultPlayground';
import { playgroundMap } from '../playgrounds/PlaygroundMap';

type RendererItem = {
  renderer: WorkerRenderer;
  running: boolean;
}

export class WorkerHandler {
  private workerRunning = false;
  private offscreenObjects = new Map<string, RendererItem>();

  private render() {
    this.offscreenObjects.forEach(({ renderer, running }) => {
      if (running) {
        renderer.render();
      }
    });

    if (this.workerRunning) {
      requestAnimationFrame(() => this.render());
    }
  }

  async build(
    canvasId: string,
    canvas: OffscreenCanvas,
    width: number,
    height: number,
    pixelRatio: number
  ) {
    const playgroundOptions = { width, height }
    const playgroundConstructor = playgroundMap.get(canvasId);
    const playground = playgroundConstructor
      ? playgroundConstructor(playgroundOptions)
      : new DefaultPlayground(playgroundOptions);

    const rendererOptions = { width, height, pixelRatio };
    const renderer = new WorkerRenderer({ antialias: true, canvas }, playground, rendererOptions);

    await playground.init();

    this.offscreenObjects.set(canvasId, { renderer, running: true });
  }

  run() {
    if (!this.workerRunning) {
      this.workerRunning = true;

      this.render();
    }
  }

  stop() {
    this.workerRunning = false;
  }

  toggle(canvasId: string) {
    const canvas = this.offscreenObjects.get(canvasId);
    canvas.running = !canvas.running;
  }
}