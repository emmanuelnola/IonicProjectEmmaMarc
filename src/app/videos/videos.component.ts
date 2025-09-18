import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { VideosService, Video } from '../services/videos.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class VideosComponent implements OnInit {

  videos: Video[] = [];
  videoLoaded: boolean[] = [];
  loading = true;

  @ViewChildren('iframeElem') iframeElems!: QueryList<ElementRef<HTMLIFrameElement>>;

  constructor(
    private sanitizer: DomSanitizer,
    private videosService: VideosService
  ) {}

  ngOnInit() {
    this.videosService.getVideos().subscribe({
      next: (data) => {
        this.videos = data;
        this.loading = false;
        this.videoLoaded = this.videos.map(() => false);
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.loading = false;
      }
    });
  }

  getSafeUrl(videoLink: string): SafeResourceUrl {
    let videoId = '';
    const watchMatch = videoLink.match(/v=([^&]+)/);
    const shortMatch = videoLink.match(/youtu\.be\/([^?]+)/);
    videoId = watchMatch?.[1] || shortMatch?.[1] || videoLink;

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    );
  }

  getThumbnail(videoLink: string): string {
    let videoId = '';
    const watchMatch = videoLink.match(/v=([^&]+)/);
    const shortMatch = videoLink.match(/youtu\.be\/([^?]+)/);
    videoId = watchMatch?.[1] || shortMatch?.[1] || videoLink;
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  loadVideo(index: number) {
    // active uniquement la vidéo cliquée
    this.videoLoaded = this.videos.map((_, i) => i === index);

    // stoppe toutes les autres
    this.iframeElems.forEach((iframe, i) => {
      if (i !== index) iframe.nativeElement.src = '';
    });
  }

  // <-- Cette fonction s’exécute automatiquement quand tu quittes la page
  ionViewWillLeave() {
    this.iframeElems.forEach(iframe => iframe.nativeElement.src = '');
  }
}
