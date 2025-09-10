import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { ActualitesComponent } from './actualites/actualites.component';
import { VideosComponent } from './videos/videos.component';
import { AudiosComponent } from './audios/audios.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProgrammesComponent } from './programmes/programmes.component';
import { GaleriePhotosComponent } from './galerie-photos/galerie-photos.component';
import { ProfessiondefoiComponent } from './professiondefoi/professiondefoi.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'actualites', component: ActualitesComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'audios', component: AudiosComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'programmes', component: ProgrammesComponent },
  { path: 'galeriePhotos', component: GaleriePhotosComponent },
  { path: 'professiondefoi', component: ProfessiondefoiComponent },
  { path: 'voirActualite', loadComponent: () => import('./voir-actualite/voir-actualite.component').then(m => m.VoirActualiteComponent) },
];
