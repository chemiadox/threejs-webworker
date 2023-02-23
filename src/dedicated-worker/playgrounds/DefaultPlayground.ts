import {
  BoxGeometry,
  CanvasTexture,
  ImageBitmapLoader,
  Mesh,
  MeshBasicMaterial,
  RepeatWrapping,
} from 'three';

import { PlaygroundInterface } from '../interfaces/PlaygroundInterface';
import { Playground } from './Playground';

export class DefaultPlayground extends Playground implements PlaygroundInterface {
  private meshes: Mesh[] = [];

  async animate() {
    const cube = this.meshes[0];
    cube.rotation.x += <number>this.options.rotationSpeed || 0;
    cube.rotation.y += <number>this.options.rotationSpeed || 0;
  }

  async init() {
    const imageLoader = new ImageBitmapLoader();
    const bitmap = await imageLoader.loadAsync('./assets/crate.gif');
    const texture = new CanvasTexture(bitmap);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;

    const material = new MeshBasicMaterial( { color: 0xffffff } );
    material.map = texture;
    material.needsUpdate = true;

    const geometry = new BoxGeometry( 2, 2, 2 );
    const cube = new Mesh(geometry, material);

    this.scene.add(cube);
    this.meshes.push(cube);

    this.camera.position.z = 5;
  }
}