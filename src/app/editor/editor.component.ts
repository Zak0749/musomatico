import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { fromEvent, Observable } from 'rxjs';
import {
  Box3,
  Color,
  Group,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { SpotifyService } from '../services/spotify.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 600) {
      this.canvasWidth = '100vw';
      this.canvasHeight = '100vw';
      return;
    }
    this.canvasWidth = '100vh';
    this.canvasHeight = '100vh';
  }

  ngOnInit(): void {
    this.onResize();
  }

  canvasWidth = '600px';
  canvasHeight = '600px';

  imgUrl = 'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25';
  title = 'Abbey Road (Remastered)';
  artists = 'The Beatles';

  url = new FormControl('');
  model = new FormControl(true);

  submitForm(e: Event) {
    e.preventDefault();
    this.spotifyService.getData(this.url.value).subscribe((data) => {
      this.imgUrl = data.images[0].url;
      this.title = data.name;
      this.artists = this.spotifyService.mapArtists(data.artists);
    });
  }
}
