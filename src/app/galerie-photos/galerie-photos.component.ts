import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-galerie',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './galerie-photos.component.html',
  styleUrls: ['./galerie-photos.component.scss']
})
export class GaleriePhotosComponent {
  // Données : catégories avec leurs images
  categories = [
    {
      name: 'Animaux',
      images: [
        { src: 'assets/blackbird-7543630_640.jpg', title: 'Chat' },
        { src: 'assets/blackbird-7543630_640.jpg', title: 'Chien' },
        { src: 'assets/blackbird-7543630_640.jpg', title: 'Lion' }
      ]
    },
    {
      name: 'Paysages',
      images: [
        { src: 'assets/blackbird-7543630_640.jpg', title: 'Montagne' },
        { src: 'assets/blackbird-7543630_640.jpg', title: 'Plage' },
        { src: 'assets/blackbird-7543630_640.jpg', title: 'Forêt' }
      ]
    }
  ];
}
