import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

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
      titre: 'Article le plus récent',
      date: '01 Septembre 2025',
      description: 'Ceci est la description de la première image. lorem ipsoum dolor Ceci est la description de la première image. lorem ipsoum dolor Ceci est la description de la première image. lorem ipsoum dolor'
    },
    {
      src: 'assets/blackbird-7543630_640.jpg',
      titre: 'Titre Deuxième article',
      date: '15 Août 2025',
      description: 'Voici un petit texte descriptif pour la deuxième image. Ceci est la description de la première image. lorem ipsoum dolor Ceci est la description de la première image. lorem ipsoum dolor'
    },
    {
      src: 'assets/blackbird-7543630_640.jpg',
      titre: 'Troisième article avec titre',
      date: '30 Juillet 2025',
      description: 'La troisième image contient aussi une description en bas. Ceci est la description de la première image. lorem ipsoum dolor Ceci est la description de la première image. lorem ipsoum dolor'
    },
    {
      src: 'assets/blackbird-7543630_640.jpg',
      titre: 'Titre Quatrième article',
      date: '15 Août 2025',
      description: 'Voici un petit texte descriptif pour la deuxième image. Ceci est la description de la première image. lorem ipsoum dolor Ceci est la description de la première image. lorem ipsoum dolor'
    },
    {
      src: 'assets/blackbird-7543630_640.jpg',
      titre: 'Dernier article avec contenu avec titre',
      date: '30 Juillet 2025',
      description: 'La troisième image contient aussi une description en bas. Ceci est la description de la première image. lorem ipsoum dolor Ceci est la description de la première image. lorem ipsoum dolor'
    }
  ];

  constructor( private router: Router ) { 

  }

  voirActualite(imageSrc: string) {
    // Logique pour naviguer vers la page de l'actualité avec l'image sélectionnée
    console.log('Naviguer vers l\'actualité avec l\'image:', imageSrc);
    // Vous pouvez utiliser le Router d'Angular pour naviguer vers une autre page
    this.router.navigate(['/voirActualite']);
  }
}
