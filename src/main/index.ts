/**
 * Application bootstrap
 */
import { ThreeWorker } from './services/ThreeWorker';

const worker: ThreeWorkerProxyInterface = ThreeWorker.create();

worker.registerCanvas('canvas1');
worker.registerCanvas('canvas2');
worker.registerCanvas('canvas3');
worker.registerCanvas('canvas4');

worker.run();
