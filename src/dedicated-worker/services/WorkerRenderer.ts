import { WebGLRenderer } from 'three';
import { WebGLRendererParameters } from 'three/src/renderers/WebGLRenderer';

import { PlaygroundInterface } from '../interfaces/PlaygroundInterface';
import { RendererOptions } from '../types/RendererOptions';

export class WorkerRenderer {
  private renderer: WebGLRenderer;

  constructor(
    params: WebGLRendererParameters,
    private readonly playground: PlaygroundInterface,
    private readonly options: RendererOptions
  ) {
    this.renderer = new WebGLRenderer(params);
    this.renderer.setSize(this.options.width, this.options.height, false);
    this.renderer.setPixelRatio(this.options.pixelRatio);
  }

  render() {
    this.playground.animate().then(() => {
      this.renderer.render(this.playground.getScene(), this.playground.getCamera());
    });
  }
}