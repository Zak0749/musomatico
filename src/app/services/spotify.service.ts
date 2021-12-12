import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, firstValueFrom, map, Observable, tap } from 'rxjs';
import {
  AlbumObjectFull,
  ArtistObjectFull,
  ArtistObjectSimplified,
  ImageObject,
  TrackObjectFull,
} from './spotify';

@Injectable()
export class SpotifyService {
  constructor(private http: HttpClient) {
    this.getAuth();
  }

  auth =
    'Basic ZjM2M2FjYmYzMzgwNDdiYzgxYjAwNjQ0YWUzYjIzMzM6MjYyNzljMDBmNDdlNDY1NzkwYzhjYWZhYjU0MjlhMzQ=';
  authKey: string | undefined;

  id(url: URL) {
    return url.pathname.split('/')[2];
  }

  isAlbum(url: URL) {
    return;
  }

  getData(urlStr: string): Observable<{
    images: ImageObject[];
    name: string;
    artists: ArtistObjectSimplified[];
  }> {
    const url = new URL(urlStr);
    if (url.pathname.includes('album')) {
      return this.http.get<AlbumObjectFull>(
        `https://api.spotify.com/v1/albums/${this.id(url)}`,
        {
          headers: {
            Authorization: `Bearer ${this.authKey}`,
          },
        }
      );
    }

    return this.http
      .get<TrackObjectFull>(
        `https://api.spotify.com/v1/tracks/${this.id(url)}`,
        {
          headers: {
            Authorization: `Bearer ${this.authKey}`,
          },
        }
      )
      .pipe(
        map((val) => {
          return {
            ...val,
            images: val.album.images,
          };
        })
      );
  }

  getAuth() {
    let body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    return this.http
      .post('https://accounts.spotify.com/api/token', body.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: this.auth,
        },
      })
      .pipe(map((val) => (val as any).access_token))
      .subscribe((value) => {
        this.authKey = value;
      });
  }

  mapArtists(artists: ArtistObjectSimplified[]) {
    return artists
      .map((val) => val.name)
      .reduce((acc, curr) => {
        if (curr === artists[artists.length - 1].name) return acc + ` ${curr}`;

        return acc + ` ${curr},`;
      }, '');
  }
}
