
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ProgrammesComponent {
  sections = [
    { title: 'Section 1', content: 'Texte descriptif pour la section 1.' },
    { title: 'Section 2', content: 'Texte descriptif pour la section 2.' },
    { title: 'Section 3', content: 'Texte descriptif pour la section 3.' },
  ];
}

