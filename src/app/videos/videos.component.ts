import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TranslatePipe],
})
export class VideosComponent {

  // Liste des vidéos YouTube
  videos = [
    { id: 'dQw4w9WgXcQ', title: 'Vidéo 1', date: '2025-09-11' },
    { id: '3JZ_D3ELwOQ', title: 'Vidéo 2', date: '2025-09-10' },
    { id: 'L_jWHffIx5E', title: 'Vidéo 3', date: '2025-09-09' },
    { id: 'mezhU0gjP4w', title: 'Vidéo 4', date: '2025-09-08' }
  ];

  // Tableau pour savoir quelle vidéo est actuellement lancée
  videoLoaded: boolean[] = [];

  constructor(private sanitizer: DomSanitizer) {
    // Initialisation : aucune vidéo n’est chargée au départ
    this.videoLoaded = this.videos.map(_ => false);
  }

  /**
   * Retourne une URL sécurisée pour l'iframe YouTube
   * @param videoId L'identifiant de la vidéo YouTube
   */
  getSafeUrl(videoId: string): SafeResourceUrl {
    // autoplay=1 est activé seulement lors du clic sur la miniature
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
  }

  /**
   * Retourne l'URL de la miniature YouTube
   * @param videoId L'identifiant de la vidéo YouTube
   */
  getThumbnail(videoId: string) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  /**
   * Fonction appelée lors du clic sur une vidéo
   * Charge uniquement la vidéo cliquée et désactive toutes les autres
   * @param index L'index de la vidéo dans le tableau
   */
  loadVideo(index: number) {
    // Seule la vidéo cliquée devient active, toutes les autres redeviennent des miniatures
    this.videoLoaded = this.videos.map((_, i) => i === index);
  }
}
