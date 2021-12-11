import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ModelComponent } from './model/model.component';
import { ThemeService } from './services/theme.service';
import { MatCardModule } from '@angular/material/card';
import { EditorComponent } from './editor/editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { SpotifyService } from './services/spotify.service';
import { PlaqueComponent } from './plaque/plaque.component';
import { NgxThreeModule } from 'ngx-three';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    ModelComponent,
    EditorComponent,
    PlaqueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    HttpClientModule,
    NgxThreeModule,
  ],
  providers: [ThemeService, SpotifyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
