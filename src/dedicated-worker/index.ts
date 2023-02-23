/**
 * Web-worker bootstrap
 */
import { WorkerHandler } from './services/WorkerHandler';

const workerHandler = new WorkerHandler();

self.onmessage = async (evt) => {
  if ('calledFunction' in evt.data) {
    const functionName: keyof WorkerHandler = evt.data.calledFunction;

    if (typeof workerHandler[functionName] !== 'undefined') {
      workerHandler[functionName].apply(workerHandler, evt.data.arguments);
    }
  }
}
