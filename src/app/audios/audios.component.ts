import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
   imports: [CommonModule, IonicModule],
  styleUrls: ['./audios.component.scss'],
   standalone: true
})
export class AudiosComponent implements OnInit {

  // Liste des audios avec leur titre et objet Audio
  audios = [
    {
      title: 'Audio faceboock',
      audioObj: new Audio('assets/audios/song1.mp3'),
      playing: false,
      currentTime: 0,
      duration: 0
    },
    {
      title: 'mes voices',
      audioObj: new Audio('assets/audios/song2.mp3'),
      playing: false,
      currentTime: 0,
      duration: 0
    },
    {
      title: 'audio travail',
      audioObj: new Audio('assets/audios/song3.mp3'),
      playing: false,
      currentTime: 0,
      duration: 0
    },
   {
        title: 'Audio 3',
        audioObj: new Audio('assets/audios/song3.mp3'),
        playing: false,
        currentTime: 0,
        duration: 0
      },
     {
          title: 'Audio 3',
          audioObj: new Audio('assets/audios/song3.mp3'),
          playing: false,
          currentTime: 0,
          duration: 0
        },
       {
            title: 'Audio 3',
            audioObj: new Audio('assets/audios/song1.mp3'),
            playing: false,
            currentTime: 0,
            duration: 0
          },
         {
              title: 'Audio 2',
              audioObj: new Audio('assets/audios/song2.mp3'),
              playing: false,
              currentTime: 0,
              duration: 0
            },
           {
                title: 'Audio 2',
                audioObj: new Audio('assets/audios/song2.mp3'),
                playing: false,
                currentTime: 0,
                duration: 0
              },
             {
                  title: 'Audio 2',
                  audioObj: new Audio('assets/audios/song2.mp3'),
                  playing: false,
                  currentTime: 0,
                  duration: 0
                },
               {
                    title: 'Audio 2',
                    audioObj: new Audio('assets/audios/song2.mp3'),
                    playing: false,
                    currentTime: 0,
                    duration: 0
                  },
                 {
                      title: 'Audio 2',
                      audioObj: new Audio('assets/audios/song2.mp3'),
                      playing: false,
                      currentTime: 0,
                      duration: 0
                    },
                   {
                        title: 'Audio 2',
                        audioObj: new Audio('assets/audios/song2.mp3'),
                        playing: false,
                        currentTime: 0,
                        duration: 0
                      },
  ];

  constructor() { }

  ngOnInit() {
    // Initialisation : récupération de la durée et mise à jour du temps
    this.audios.forEach(audio => {
      audio.audioObj.addEventListener('loadedmetadata', () => {
        audio.duration = audio.audioObj.duration;
      });

      audio.audioObj.addEventListener('timeupdate', () => {
        audio.currentTime = audio.audioObj.currentTime;
      });
    });
  }

  // Play/Pause toggle
  togglePlay(index: number) {
    const audio = this.audios[index];
    if (!audio.playing) {
      // Arrêter tous les autres audios
      this.audios.forEach((a, i) => {
        if (i !== index) {
          a.audioObj.pause();
          a.playing = false;
        }
      });
      audio.audioObj.play();
      audio.playing = true;
    } else {
      audio.audioObj.pause();
      audio.playing = false;
    }
  }

  // Stop audio
  stop(index: number) {
    const audio = this.audios[index];
    audio.audioObj.pause();
    audio.audioObj.currentTime = 0;
    audio.playing = false;
  }

  // Changer la position via la barre de progression
  seek(index: number, event: any) {
    const audio = this.audios[index];
    audio.audioObj.currentTime = Number(event.target.value);
  }

  // Formatage du temps en mm:ss
  formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${this.pad(mins)}:${this.pad(secs)}`;
  }

  private pad(value: number) {
    return value < 10 ? '0' + value : value;
  }

}
