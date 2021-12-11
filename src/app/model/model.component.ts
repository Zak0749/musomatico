import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Box3,
  BoxGeometry,
  Camera,
  Color,
  Group,
  Material,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Renderer,
  Scene,
  TorusGeometry,
  WebGLRenderer,
} from 'three';
import { ThemeService } from '../services/theme.service';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
})
export class ModelComponent implements OnInit, AfterViewInit {
  constructor(private themeService: ThemeService) {}
  @ViewChild('canvas')
  canvasRef?: ElementRef;

  private gltfLoader = new GLTFLoader();

  renderer?: WebGLRenderer;
  scene?: Scene;
  camera?: Camera;
  model?: Group;
  controls?: OrbitControls;

  get canvas() {
    return this.canvasRef?.nativeElement;
  }

  get aspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.scene = new Scene();
    this.scene.background =
      this.themeService.theme === 'light'
        ? new Color(0xfafafa)
        : new Color(0x303030);

    this.gltfLoader.load('/assets/scene.glb', (gltf) => {
      this.model = gltf.scene;
      var box = new Box3().setFromObject(this.model);
      box.getCenter(this.model.position);
      this.model.position.multiplyScalar(-1);
      this.scene!.add(this.model);
    });

    const aspectRatio = this.aspectRatio;
    this.camera = new PerspectiveCamera(1, aspectRatio);

    this.camera.position.setZ(150);
    this.camera.position.setX(150);
    this.camera.position.setY(100);

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.controls = new OrbitControls(this.camera!, this.renderer?.domElement);
    let component: ModelComponent = this;
    this.themeService.onChange.subscribe((theme) => {
      component.scene!.background =
        this.themeService.theme === 'dark'
          ? new Color(0xfafafa)
          : new Color(0x303030);
    });

    function render() {
      component.controls!.update();
      component.renderer!.render(component.scene!, component.camera!);
      requestAnimationFrame(render);
    }

    render();
  }
}
