import { DOCUMENT } from '@angular/common';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type theme = 'light' | 'dark';

@Injectable()
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {
    const stored = localStorage.getItem('theme-prefrence');
    if (stored && (stored === 'light' || stored === 'dark')) {
      this.theme = stored;
      this.changeHtml(this.theme);
    }

    const pref = window.matchMedia('(prefers-color-scheme: dark)');

    if (localStorage.getItem('theme-prefrence')) return;
    const newColorScheme = pref.matches ? 'dark' : 'light';
    this.theme = newColorScheme;
    this.changeHtml(this.theme);

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        if (localStorage.getItem('theme-prefrence')) return;
        const newColorScheme = event.matches ? 'dark' : 'light';
        this.theme = newColorScheme;
        this.changeHtml(this.theme);
      });
  }
  theme: theme = 'light';

  setTheme(theme: theme) {
    this.changeHtml(theme);
    this.theme = theme;
    localStorage.setItem('theme-prefrence', theme);
  }

  changeHtml(theme: theme) {
    this.onChange.next(theme);
    this.document.body.classList.remove(
      `${theme === 'dark' ? 'light' : 'dark'}-theme`
    );
    this.document.body.classList.add(`${theme}-theme`);
  }

  onChange = new Subject();
}
