import { PlaygroundOptions } from '../types/PlaygroundOptions';
import { Playground } from './Playground';
import { DefaultPlayground } from './DefaultPlayground';
import { ModelPlayground } from './ModelPlayground';

type PlaygroundCreateFunction = (options: PlaygroundOptions) => Playground;

export const playgroundMap: Map<string, PlaygroundCreateFunction> = new Map([
  [
    'canvas1',
    (options: PlaygroundOptions)  =>
      new DefaultPlayground({ ...options, rotationSpeed: 0.01 }),
  ],
  [
    'canvas2',
    (options: PlaygroundOptions)  =>
      new DefaultPlayground({ ...options, rotationSpeed: 0.02 }),
  ],
  [
    'canvas3',
    (options: PlaygroundOptions)  =>
      new DefaultPlayground({ ...options, rotationSpeed: 0.005 }),
  ],
  [
    'canvas4',
    (options: PlaygroundOptions)  =>
      new ModelPlayground({ ...options, filename: './assets/xwing/scene.gltf' }) as Playground,
  ],
]);
