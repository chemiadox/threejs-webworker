import { ThreeWorkerInterface } from '../interfaces/ThreeWorkerInterface';
import { ThreeWorkerProxyInterface } from '../interfaces/ThreeWorkerProxyInterface';

export class ThreeWorker implements ThreeWorkerInterface {
  constructor(private worker: Worker) {}

  // Takes the canvas element by its id and passes offscreen to the worker
  registerCanvas(canvasId: string): void {
    const htmlCanvas = <HTMLCanvasElement>document.getElementById(canvasId);
    const canvas = htmlCanvas.transferControlToOffscreen();

    this.callFunctionTransfer(
      'build',
      [canvas],
      canvasId,
      canvas,
      htmlCanvas.clientWidth,
      htmlCanvas.clientHeight,
      window.devicePixelRatio,
    );
  }

  // RPC-like call of the web-worker's function without transferable objects
  callFunction(functionName: string, ...params: unknown[]): void {
    this.worker.postMessage({
      calledFunction: functionName,
      arguments: [...params],
    });
  }

  // RPC-like call of the web-worker's function with transferable objects
  callFunctionTransfer(functionName: string, transfer: Transferable[], ...params: unknown[]): void {
    this.worker.postMessage({
      calledFunction: functionName,
      arguments: [...params],
    }, transfer);
  }

  static create(): ThreeWorkerProxyInterface {
    // TODO: Unfortunately this is hardcoded due to WebPack's "magic" comment. is there any way to avoid it?
    const worker = new ThreeWorker(
      new Worker(/* webpackChunkName: "foo-worker" */ new URL('../../dedicated-worker/index.ts', import.meta.url))
    );

    // Return Proxy of the base Worker enriched with methods of ThreeWorker
    return new Proxy(worker, {
      get(target: ThreeWorker, name: string) {
        // If the worker has declared function - fall back to it...
        if (name in target) {
          return target[name as keyof ThreeWorker];
        }

        // ...otherwise try to pass params to call the function inside the web-worker
        return function (...params: []) {
          target.callFunction(name, ...params);
        }
      }
    }) as unknown as ThreeWorkerProxyInterface;
  }
}
