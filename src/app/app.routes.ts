import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { ActualitesComponent } from './actualites/actualites.component';
import { VideosComponent } from './videos/videos.component';
import { AudiosComponent } from './audios/audios.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProgrammesComponent } from './programmes/programmes.component';
import { GaleriePhotosComponent } from './galerie-photos/galerie-photos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'actualites', component: ActualitesComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'audios', component: AudiosComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'programmes', component: ProgrammesComponent },
  { path: 'galeriePhotos', component: GaleriePhotosComponent }
];
