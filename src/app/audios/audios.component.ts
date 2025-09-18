import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { AudioService, MyAudio } from '../services/audios.service';


@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class AudiosComponent implements OnInit {

  audios: MyAudio[] = [];          // Liste des audios récupérés depuis l'API
  audioElement!: HTMLAudioElement; // Élément HTML audio
  loading: boolean = false;        // Spinner pendant le chargement
  isPlaying: boolean = false;      // État lecture / pause
  pageLoad:boolean=true; //affiche ls elts de la page s'ils sont deja present
  currentTime: number = 0;         // Temps écoulé
  duration: number = 0;            // Durée totale
  currentAudio!: MyAudio;          // Audio en cours

  private apiUrl: string = 'https://presi.lab-123.com'; // Base URL serveur

  constructor(private audioService: AudioService, private toastCtrl: ToastController) {}

  ngOnInit() {
    // Crée l’élément audio invisible
    this.audioElement = new Audio();

    // Met à jour la barre de progression
    this.audioElement.ontimeupdate = () => {
      this.currentTime = this.audioElement.currentTime;
    };

    // Quand les métadonnées sont chargées
    this.audioElement.onloadedmetadata = () => {
      this.duration = this.audioElement.duration;
      this.loading = false;
    };

    // Quand la lecture est terminée
    this.audioElement.onended = () => {
      this.isPlaying = false;
      this.currentTime = 0;
    };

    // Récupère la liste des audios depuis le serveur
    this.audioService.getAudios().subscribe({
      next: (data: MyAudio[]) =>{ this.audios = data; this.pageLoad=false; },
      error: (err) => {console.error('❌ Erreur API audios:', err) ;this.pageLoad=false;}
    });
  }

  // Jouer un audio
  playAudio(audio: MyAudio) {
    // Si on clique sur un autre audio que celui en cours
    if (this.currentAudio !== audio) {
      this.loading = true;
      this.currentAudio = audio;
      this.audioElement.src = `${this.apiUrl}${audio.field_audio}`;
      this.audioElement.load();
    }

    this.audioElement.play().then(() => {
      this.isPlaying = true;
      this.loading = false;
    }).catch(err => {
      console.error('Erreur lecture audio:', err);
      this.loading = false;
    });
  }

  // Pause
  pauseAudio() {
    this.audioElement.pause();
    this.isPlaying = false;
  }

  // Stop
  stopAudio() {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
    this.isPlaying = false;
  }

  // Déplacer la barre de progression
  seekAudio(event: any) {
    const value = event.detail.value;
    this.audioElement.currentTime = value;
    this.currentTime = value;
  }

  // Format mm:ss
  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  // Toggle play/pause
  togglePlay(audio: MyAudio) {
    if (this.isPlaying && this.currentAudio === audio) {
      this.pauseAudio();
    } else {
      this.playAudio(audio);
    }
  }
  ionViewWillLeave() {
     // Stopper l'audio quand on quitte la page
     this.stopAudio();
   }

}
/*le temps  <div class="time" *ngIf="currentAudio === audio">
                      {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
                    </div>*/

