import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule} from '@ionic/angular';
import { ImageModalComponent } from '../modals-img/modals-img.component'; // ✅ On importe le modal
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gadgets',
  standalone: true,
  imports: [IonicModule,CommonModule],
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
}
