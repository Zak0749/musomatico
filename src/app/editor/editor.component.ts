import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import {
  Box3,
  Color,
  Group,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, AfterViewInit {
  constructor(private themeService: ThemeService) {}

  @ViewChild('canvas')
  canvasRef?: ElementRef;

  get canvas() {
    return this.canvasRef?.nativeElement;
  }

  get aspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  get height() {
    return Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
  }

  get currentScroll() {
    return document.body.getBoundingClientRect().top;
  }

  get persentDownPage() {
    return (this.currentScroll / this.height) * 100;
  }

  gltfLoader = new GLTFLoader();
  renderer?: WebGLRenderer;
  scene?: Scene;
  camera?: PerspectiveCamera;
  model?: Group;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.scene = new Scene();
    this.scene.background =
      this.themeService.theme === 'light'
        ? new Color(0xfafafa)
        : new Color(0x303030);
    const aspectRatio = this.aspectRatio;
    this.camera = new PerspectiveCamera(1, aspectRatio);

    this.gltfLoader.load('/assets/scene.glb', (gltf) => {
      this.model = gltf.scene;
      var box = new Box3().setFromObject(this.model);
      box.getCenter(this.model.position); // this re-sets the mesh position
      this.model.position.multiplyScalar(-1);
      this.scene!.add(this.model);
    });

    this.camera.position.setZ(500);
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component = this;
    this.themeService.onChange.subscribe((theme) => {
      component.scene!.background =
        this.themeService.theme === 'dark'
          ? new Color(0xfafafa)
          : new Color(0x303030);
    });

    fromEvent(window, 'scroll').subscribe((e) => {
      component.model!.rotation.y = this.persentDownPage / 10;
    });

    function render() {
      component.renderer!.render(component.scene!, component.camera!);
      requestAnimationFrame(render);
    }

    render();
  }
}
