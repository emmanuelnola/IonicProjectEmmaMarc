import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  standalone: true,
    imports: [IonicModule, CommonModule]
})
export class DocumentsComponent {
  documents = [
    { title: 'Cours Angular', url: 'assets/docs/angular.pdf' },
    { title: 'Guide Ionic', url: 'assets/docs/ionic.pdf' },
    { title: 'Tutoriel TypeScript', url: 'assets/docs/typescript.pdf' },
    { title: 'Guide Ionic', url: 'assets/docs/ionic.pdf' },
    { title: 'Guide Ionic', url: 'assets/docs/ionic.pdf' },
    { title: 'Guide Ionic', url: 'assets/docs/ionic.pdf' },
    { title: 'Tutoriel TypeScript', url: 'assets/docs/typescript.pdf' },
    { title: 'Tutoriel TypeScript', url: 'assets/docs/typescript.pdf' }
  ];
}
