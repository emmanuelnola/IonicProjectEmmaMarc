/*import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule} from '@ionic/angular';
import { ImageModalComponent } from '../modals-img/modals-img.component'; // ✅ On importe le modal
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gadgets',
  standalone: true,
  imports: [IonicModule,CommonModule, TranslatePipe],
  templateUrl: './gadgets.component.html',
  styleUrls: ['./gadgets.component.scss']
})
export class GadgetsComponent {
  // 📌 Liste des images avec leur chemin et leur titre
  gadgets = [
    { src: 'assets/blackbird-7543630_640.jpg', title: 'Gadget 1' },
    { src: 'assets/blackbird-7543630_640.jpg', title: 'Gadget 2' },
    { src: 'assets/blackbird-7543630_640.jpg', title: 'Gadget 3' },
    { src: 'assets/blackbird-7543630_640.jpg', title: 'Gadget 4' }
  ];

  constructor(private modalCtrl: ModalController) {}

  // 📌 Fonction appelée au clic → ouvre un modal avec l'image en grand
  async openImage(gadget: {src: string, title: string}) {
    const modal = await this.modalCtrl.create({
      component: ImageModalComponent, // ✅ modal qu’on a créé
      componentProps: { img: gadget.src, title: gadget.title } // On passe les données au modal
    });
    await modal.present();
  }
}*/

import { Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule} from '@ionic/angular';
import { ImageModalComponent } from '../modals-img/modals-img.component'; // ✅ On importe le modal
import { CommonModule } from '@angular/common';

import { GadgetsService, MyImage } from '../services/gadgets.service';

@Component({
  selector: 'app-gadgets',
 standalone: true,
  imports: [IonicModule,CommonModule],
  templateUrl: './gadgets.component.html',
  styleUrls: ['./gadgets.component.scss']
})
export class GadgetsComponent implements OnInit {

  gadgets: MyImage[] = [];   // Contiendra la liste des images
  loading = true;           // Pour afficher un message de chargement
  error: string | null = null;  // Pour afficher les erreurs

  constructor(private gadgetsService: GadgetsService) { }

  ngOnInit() {
    this.gadgetsService.getImages().subscribe({
      next: (data) => {
        this.gadgets = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur API:', err);
        this.error = 'Impossible de charger les images.';
        this.loading = false;
      }
    });
  }
}

