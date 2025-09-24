

import { Component, OnInit, signal } from '@angular/core';
import { ToastController, IonicModule, AlertController } from '@ionic/angular';  // Pour les toasts
import { DocumentsService, MyDocument } from '../services/documents.service';
import { DownloadFileService } from '../services/downloadFile.service';
import { Capacitor } from '@capacitor/core';
import { environment } from '../../environments/environment';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  standalone: true,          // Composant standalone
  imports: [IonicModule ,CommonModule ]    // Nécessaire pour ion-list, ion-item, ion-button
})
export class DocumentsComponent implements OnInit {

  // Signal pour stocker et mettre à jour la liste des documents de manière réactive
  documents: MyDocument[] = [];
   loading: boolean = true;
   pdfUrl:string="";
   nomFichier:string="";
   progress = 0;
   downloading = false;

  constructor(
    private documentsService: DownloadFileService,
     private alertController: AlertController

  ) {}

  ngOnInit() {
      this.documentsService.getDocuments().subscribe({
         next: (docs) => {
           this.documents = docs;
           this.loading = false;
         },
         error: async (err) => {
           this.loading = false;
           console.error(err);

         }
       });
  }



   async download(doc: MyDocument) {
     try {
             const filePath = await this.documentsService.download(`${environment.apiLink}${doc.field_fichier}`, `${doc.title}.pdf`);

             await this.showAlert(
               '✅ Téléchargement réussi!',
               `"${doc.title}" a été enregistré dans "${filePath}".`
             );

           } catch (error) {
             await this.showAlert(
               '❌ Erreur',
               `Impossible de télécharger "${doc.title}"`
             );
           }


   }

    private async showAlert(header: string, message: string) {
          const alert = await this.alertController.create({
            header,
            message,
            buttons: ['OK']
          });
          await alert.present();
        }

}
