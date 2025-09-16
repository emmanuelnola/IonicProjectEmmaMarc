import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonImg],
  templateUrl: './modals-img.component.html',
  styleUrls: ['./modals-img.component.scss'],

})
export class ImageModalComponent {
  @Input() img!: string;   // 📌 l’image à afficher
  @Input() title!: string; // 📌 le titre de l’image

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss(); // 📌 Ferme le modal
  }
}
