import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CanvasTexture, Texture } from 'three';

@Component({
  selector: 'app-plaque',
  templateUrl: './plaque.component.html',
  styleUrls: ['./plaque.component.scss'],
})
export class PlaqueComponent implements OnInit, OnChanges {
  constructor() {}

  ctx = document
    .createElement('canvas')
    .getContext('2d') as CanvasRenderingContext2D;

  @Input()
  imgUrl: string = '';

  @Input()
  title: string = '';

  @Input()
  artists: string = '';

  @Input()
  width: string = '300px';

  @Input()
  height: string = '300px';

  texture = new Texture();

  render() {
    this.ctx.canvas.width = 450;
    this.ctx.canvas.height = 610;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.ctx.drawImage(img, 60, 20, 330, 330);
      this.texture.needsUpdate = true;
    };
    img.src = this.imgUrl;

    this.ctx.font = '45px Arial';
    this.ctx.fillText(this.title, 60, 400, 330);

    this.ctx.font = '25px Arial';
    this.ctx.fillText(this.artists, 60, 430, 330);

    const uibar = new Image();
    uibar.crossOrigin = 'anonymous';
    uibar.onload = () => {
      this.ctx.drawImage(uibar, 60, 440, 330, 132);
      this.texture.needsUpdate = true;
    };
    uibar.src = '/assets/appbar.svg';

    this.texture.needsUpdate = true;
    this.texture = new CanvasTexture(this.ctx.canvas);
  }

  ngOnInit(): void {
    this.render();
  }

  ngOnChanges(): void {
    this.render();
  }
}
