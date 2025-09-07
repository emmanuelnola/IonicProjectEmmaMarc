import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // ✅ Correct import pour DomSanitizer et SafeResourceUrl
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

 interface Video {
   id: string;
   title: string;
   safeUrl?: SafeResourceUrl;
 }

 @Component({
   selector: 'app-videos',
   templateUrl: './videos.component.html',
   styleUrls: ['./videos.component.scss'],
    imports: [CommonModule, IonicModule],
   standalone: true
 })
 export class VideosComponent {

   videos: Video[] = [
     { id: 'dQw4w9WgXcQ', title: 'les aventures de mitoumba' },
     { id: '3JZ_D3ELwOQ', title: 'une saison blanche et sèche' },
     { id: 'V-_O7nl0Ii0', title: 'les amis ' },
     { id: 'L_jWHffIx5E', title: 'Quatrième vidéo' },
     { id: 'V-_O7nl0Ii0', title: 'les amis ' },
      { id: 'dQw4w9WgXcQ', title: 'les aventures de mitoumba' },
   ];

   constructor(private sanitizer: DomSanitizer) {
     // Sécurisation des URLs pour Angular
     this.videos.forEach(video => {
       video.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
         `https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&controls=1`
       );
     });
   }
 }

