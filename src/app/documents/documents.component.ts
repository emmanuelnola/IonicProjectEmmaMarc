
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DocumentsService,MyDocument} from '../services/documents.service';
import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-documents',
  templateUrl: 'documents.component.html',
  imports: [ CommonModule, IonicModule, TranslatePipe],
  styleUrls: ['documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  documents: MyDocument[] = [];       //  Tableau qui contiendra les documents récupérés depuis l'API

  constructor(
    private documentsService: DocumentsService, // Injection du service pour appeler l'API
    private toastCtrl: ToastController          //  Injection du ToastController pour afficher des messages
  ) {}

  ngOnInit() {
    //  Appelé automatiquement quand le composant est chargé
    // Récupère les documents depuis l'API
    this.documentsService.getDocuments().subscribe({
      next: (data :  MyDocument[]) => (this.documents = data), // Si succès → remplir le tableau documents
      error: (err:any) => console.error('Erreur API:', err) // Si erreur → log dans la console
    });


  }

  //  Fonction appelée quand on clique sur un document
  async download(doc:  MyDocument) {
    console.log(doc.field_fichier);
    // Appelle la méthode du service pour récupérer le fichier en blob
    this.documentsService.downloadDocument(doc.field_fichier).subscribe({
      next: (blob:Blob) => {
        // ⃣ Créer un objet URL temporaire pour le blob
        const url = window.URL.createObjectURL(blob);

        //  Créer un élément <a> invisible pour déclencher le téléchargement
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.title //  Nom du fichier téléchargé
        a.click();              //  Simule le clic → déclenche le téléchargement

        //  Libérer l'URL temporaire pour éviter les fuites mémoire
        window.URL.revokeObjectURL(url);

        // ⃣ Afficher un toast pour informer l’utilisateur
        this.toastCtrl.create({
          message: `Téléchargement de "${doc.title}" lancé !`,
          duration: 2000,   //  Durée 2 secondes
          color: 'success'  //  Couleur verte pour succès
        }).then(toast => toast.present());
      },
      error: (err:any) => {
        // Si erreur pendant le téléchargement, on log et on affiche un toast rouge
        console.error('Erreur téléchargement:', err);
        this.toastCtrl.create({
          message: `Impossible de télécharger "${doc.title}"`,
          duration: 2000,
          color: 'danger'
        }).then(toast => toast.present());
      }
    });
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
