import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, firstValueFrom, map, tap } from 'rxjs';
import { Buffer } from 'buffer';

interface TrackLinkObject {
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  type: 'track';
  uri: string;
}

interface ExternalUrlObject {
  spotify: string;
}

interface RestrictionsObject {
  reason: string;
}

interface ImageObject {
  height?: number | undefined;
  url: string;
  width?: number | undefined;
}

interface ArtistObjectSimplified {
  name: string;
  id: string;
  type: 'artist';
  external_urls: ExternalUrlObject;
  uri: string;
}

interface TrackObjectSimplified {
  artists: ArtistObjectSimplified[];
  available_markets?: string[] | undefined;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  is_playable?: boolean | undefined;
  linked_from?: TrackLinkObject | undefined;
  restrictions?: RestrictionsObject | undefined;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
}

interface PagingObject<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

interface ExternalIdObject {
  isrc?: string | undefined;
  ean?: string | undefined;
  upc?: string | undefined;
}

interface CopyrightObject {
  text: string;
  type: 'C' | 'P';
}

export type Album = {
  copyrights: CopyrightObject[];
  external_ids: ExternalIdObject;
  genres: string[];
  label: string;
  popularity: number;
  tracks: PagingObject<TrackObjectSimplified>;
  album_group?: 'album' | 'single' | 'compilation' | 'appears_on' | undefined;
  album_type: 'album' | 'single' | 'compilation';
  artists: ArtistObjectSimplified[];
  available_markets?: string[] | undefined;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  restrictions?: RestrictionsObject | undefined;
  type: 'album';
  total_tracks: number;
  href: string;
  external_urls: ExternalUrlObject;
  uri: string;
};

@Injectable()
export class SpotifyService {
  constructor(private http: HttpClient) {
    this.getAuth();
  }

  auth =
    'Basic ZjM2M2FjYmYzMzgwNDdiYzgxYjAwNjQ0YWUzYjIzMzM6MjYyNzljMDBmNDdlNDY1NzkwYzhjYWZhYjU0MjlhMzQ=';
  authKey: string | undefined;

  id(urlStr: string) {
    return new URL(urlStr).pathname.split('/')[2];
  }

  getData(url: string) {
    return this.http.get<Album>(
      `https://api.spotify.com/v1/albums/${this.id(url)}`,
      {
        headers: {
          Authorization: `Bearer ${this.authKey}`,
        },
      }
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
