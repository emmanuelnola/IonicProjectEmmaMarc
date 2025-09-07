import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-actualites',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.scss']
})
export class ActualitesComponent {
  images = [
    {
      src: 'assets/blackbird-7543630_640.jpg',
      titre: 'Première image',
      date: '01 Septembre 2025',
      description: 'Ceci est la description de la première image. lorem ipsoum dolor Ceci est la description de la première image. lorem ipsoum dolor Ceci est la description de la première image. lorem ipsoum dolor'
    },
    {
      src: 'assets/blackbird-7543630_640.jpg',
      titre: 'Deuxième image',
      date: '15 Août 2025',
      description: 'Voici un petit texte descriptif pour la deuxième image. Ceci est la description de la première image. lorem ipsoum dolor Ceci est la description de la première image. lorem ipsoum dolor'
    },
    {
      src: 'assets/blackbird-7543630_640.jpg',
      titre: 'Troisième image',
      date: '30 Juillet 2025',
      description: 'La troisième image contient aussi une description en bas. Ceci est la description de la première image. lorem ipsoum dolor Ceci est la description de la première image. lorem ipsoum dolor'
    }
  ];
}
