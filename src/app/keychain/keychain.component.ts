import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  CanvasTexture,
  Color,
  MeshBasicMaterial,
  MeshLambertMaterial,
  Texture,
} from 'three';

@Component({
  selector: 'app-keychain',
  templateUrl: './keychain.component.html',
  styleUrls: ['./keychain.component.scss'],
})
export class KeychainComponent implements OnInit, OnChanges {
  constructor() {}

  ngOnInit(): void {
    this.render();
  }

  ngOnChanges(): void {
    this.render();
  }

  render() {
    this.ctx.canvas.width = 610;
    this.ctx.canvas.height = 910;
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = 'black';

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.ctx.drawImage(img, 55, 30, 500, 500);
      this.texture.needsUpdate = true;
    };
    img.src = this.imgUrl;

    this.ctx.font = '80px Montserrat';
    this.ctx.fillText(this.title, 55, 610, 500);

    this.ctx.font = '50px Montserrat';
    this.ctx.fillText(this.artists, 55, 660, 500);

    const uibar = new Image();
    uibar.crossOrigin = 'anonymous';
    uibar.onload = () => {
      this.ctx.drawImage(uibar, 55, 700, 500, 200);
      this.texture.needsUpdate = true;
    };
    uibar.src = '/assets/appbar.svg';

    this.texture.needsUpdate = true;
  }

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

  ctx = document
    .createElement('canvas')
    .getContext('2d') as CanvasRenderingContext2D;

  texture = new CanvasTexture(this.ctx.canvas);
  whiteTexture = new Color('white');
}
