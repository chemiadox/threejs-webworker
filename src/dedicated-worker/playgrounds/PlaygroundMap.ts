import { DefaultPlayground } from './DefaultPlayground';
import { ModelPlayground } from './ModelPlayground';
import { PlaygroundOptions } from '../types/PlaygroundOptions';
import { Playground } from './Playground';

export const playgroundMap: Map<string, Function> = new Map([
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
