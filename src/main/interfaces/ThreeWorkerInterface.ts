export interface ThreeWorkerInterface {
  registerCanvas(canvasId: string, options?: { [key: string]: unknown }): void;
  callFunction(functionName: string, ...params: unknown[]): void;
  callFunctionTransfer(functionName: string, transfer: Transferable[], ...params: unknown[]): void;
}
