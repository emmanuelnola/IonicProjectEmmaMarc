import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents',
  templateUrl: 'documents.component.html',
  imports: [ CommonModule, IonicModule],
  styleUrls: ['documents.component.scss'],
})
export class DocumentsComponent {

  documents = [
    { name: ' Document1.pdf une saison blanche', url: 'assets/docs/doc1.pdf' },
    { name: 'Document2.pdf', url: 'assets/docs/doc2.pdf' },
    { name: 'Document3.pdf', url: 'assets/docs/doc3.pdf' },
    { name: ' Document1.pdf une saison blanche', url: 'assets/docs/doc1.pdf' },
   { name: 'Document2.pdf', url: 'assets/docs/doc2.pdf' },
    { name: 'Document3.pdf', url: 'assets/docs/doc3.pdf' },
    { name: ' Document1.pdf une saison blanche', url: 'assets/docs/doc1.pdf' },
     { name: 'Document2.pdf', url: 'assets/docs/doc2.pdf' },
     { name: 'Document3.pdf', url: 'assets/docs/doc3.pdf' },
     { name: ' Document1.pdf une saison blanche', url: 'assets/docs/doc1.pdf' },
       { name: 'Document2.pdf', url: 'assets/docs/doc2.pdf' },
      { name: 'Document3.pdf', url: 'assets/docs/doc3.pdf' },
      { name: ' Document1.pdf une saison blanche', url: 'assets/docs/doc1.pdf' },
       { name: 'Document3.pdf', url: 'assets/docs/doc3.pdf' },
  ];

  constructor() {}

  download(doc: any) {
    // ouvre le document dans un nouvel onglet pour téléchargement
    window.open(doc.url, '_blank');
  }
}



/*import { Component } from '@angular/core';
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
*/
