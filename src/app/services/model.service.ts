import { ElementRef, Injectable } from '@angular/core';
import { Camera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable()
export class ModelComponent {
  constructor() {}

  canvas?: Element;
  renderer?: WebGLRenderer;

  setCanvas(ref: ElementRef) {
    this.canvas = ref.nativeElement;
  }

  startRenderLoop(component: {
    scene: Scene;
    camera: Camera;
    controls?: OrbitControls;
  }) {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas!,
    });

    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas!.clientWidth, this.canvas!.clientHeight);

    const { renderer } = this;
    const { controls, scene, camera } = component;
    function render() {
      if (controls) controls.update();
      renderer!.render(scene!, camera!);
      requestAnimationFrame(render);
    }

    render();
  }
}
