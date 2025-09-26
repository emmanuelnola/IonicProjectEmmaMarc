import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController , AlertController} from '@ionic/angular';
import {  DownloadFileService, MyAudio } from '../services/downloadFile.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})


export class AudiosComponent implements OnInit {

  lang: string = 'fr';
  audios: MyAudio[] = [];          // Liste des audios récupérés depuis l'API
  audioElement!: HTMLAudioElement; // Élément HTML audio
  loading: boolean = false;        // Spinner pendant le chargement
  isPlaying: boolean = false;      // État lecture / pause
  pageLoad:boolean=true; //affiche ls elts de la page s'ils sont deja present
  currentTime: number = 0;         // Temps écoulé
  duration: number = 0;            // Durée totale
  currentAudio!: MyAudio;          // Audio en cours

/*--------------------*/
 //variable necessaire au telechargement
   isDownloading = false;
    currentDownload!: MyAudio;
    downloadProgress = 0;
    message = '';
    downloadedBytes = 0;
    totalBytes = 0;
    fileName=" ";
    /*-----*/

  private apiUrl: string =environment.apiLink; // Base URL serveur

  constructor(private audioService: DownloadFileService,  private alertController: AlertController) {}

  ngOnInit() {
    this.lang = localStorage.getItem('lang') || 'fr';
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
      next: (data: MyAudio[]) =>{ this.audios = data.filter((item: any) => item.langcode === this.lang);
        this.pageLoad=false; },
      error: (err) => {console.error('❌ Erreur API audios:', err) ;this.pageLoad=false;}
    });

     // Configurer le callback de progression
     this.audioService.setProgressCallback((progress) => {

        this.downloadProgress = progress;

         // Forcer la mise à jour de la vue
         setTimeout(() => {
          // Cette ligne force Angular à détecter les changements
          this.downloadProgress = progress;
           }, 0);
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




    // Télécharger un audio
    async downloadAudio(audio: MyAudio) {
      this.isDownloading = true;

      this.currentDownload = audio;
      this.downloadProgress = 0;
      this.message = '';


      try {
        this.fileName=this.getLastPathElement(`${environment.apiLink}${audio.field_audio}`);
        const filePath = await this.audioService.downloadFile(`${environment.apiLink}${audio.field_audio}`,this.fileName);

        await this.showAlert(
          '✅ Téléchargement réussi!',
          `"${audio.title}" a été enregistré dans "${filePath}".`
        );

      } catch (error) {
        await this.showAlert(
          '❌ Erreur',
          `Impossible de télécharger "${audio.title}"`
        );
      }

      this.isDownloading = false;
      this.currentDownload = audio;

    }

     // Annuler le téléchargement
      cancelDownload() {
        this.isDownloading = false;
        //this.currentDownload = '';
        this.downloadProgress = 0;
        this.showAlert('Info', 'Téléchargement annulé');
      }

    private async showAlert(header: string, message: string) {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: ['OK']
      });
      await alert.present();
    }


  private getLastPathElement(path: string): string {
                const segments = path.split('/').filter(segment => segment !== '');
                return segments.length > 0 ? segments[segments.length - 1] : '';
              }



}
/*le temps  <div class="time" *ngIf="currentAudio === audio">
                      {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
                    </div>*/

