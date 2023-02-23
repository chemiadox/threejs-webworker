import { AmbientLight, DirectionalLight, Group, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { PlaygroundInterface } from '../interfaces/PlaygroundInterface';
import { Playground } from './Playground';

export class ModelPlayground extends Playground implements PlaygroundInterface {
  private group: Group;

  async animate() {
    this.group.rotation.y += 0.002;
  }

  async init() {
    const gltfLoader = new GLTFLoader();
    this.group = new Group();

    const ambientLight = new AmbientLight( 0xffffff );
    this.scene.add( ambientLight );

    const directionalLight = new DirectionalLight( 0xffffff );
    directionalLight.position.set( -100, 100, 50 ).normalize();
    directionalLight.lookAt(0, 0, 0);
    this.scene.add( directionalLight );

    const gltf = await gltfLoader.loadAsync(<string>this.options.filename);

    this.group.add(this.camera);

    this.camera.position.set(0,35,100);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.scene.add(gltf.scene);
    this.scene.add(this.group);
    console.log(gltf);
  }
}