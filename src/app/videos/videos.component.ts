import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';




// Interface pour représenter une vidéo
interface Video {
  id: string;     // ID unique de la vidéo YouTube
  title: string;  // Titre de la vidéo
}

@Component({
  selector: 'app-videos',                   // Sélecteur utilisé dans l'HTML parent
  templateUrl: './videos.component.html',   // Template HTML du composant
  imports: [ CommonModule, IonicModule],
  styleUrls: ['./videos.component.scss']    // Styles SCSS du composant
})
export class VideosComponent {

  // Liste des vidéos à afficher
  videos: Video[] = [
    { id: 'dQw4w9WgXcQ', title: 'Les aventures de Mitoumba' },
    { id: '3JZ_D3ELwOQ', title: 'Une saison blanche et sèche' },
    { id: 'V-_O7nl0Ii0', title: 'Les amis' },
    { id: 'L_jWHffIx5E', title: 'Quatrième vidéo' }
  ];

  // Stocke l'ID de la vidéo actuellement en lecture
  activeVideo: string | null = null;

  constructor(private sanitizer: DomSanitizer) {} // DomSanitizer pour sécuriser l'URL iframe

  // Méthode appelée au clic sur une vignette pour lancer la vidéo
  playVideo(videoId: string) {
    this.activeVideo = videoId;  // On met à jour la vidéo active
  }

  // Retourne une URL sécurisée pour l'iframe (évite l'injection de script)
  getSafeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`
    );
    /*
      Paramètres YouTube :
      - autoplay=1 : démarre la vidéo automatiquement
      - rel=0 : pas de vidéos suggérées à la fin
      - modestbranding=1 : réduit le logo YouTube
      - controls=1 : affiche les boutons de lecture
    */
  }
}
