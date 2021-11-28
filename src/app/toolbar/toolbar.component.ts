import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.setTheme(
      this.themeService.theme === 'light' ? 'dark' : 'light'
    );
  }

  ngOnInit(): void {}
}
