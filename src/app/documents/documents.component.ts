

import { Component, OnInit, signal } from '@angular/core';
import { ToastController, IonicModule } from '@ionic/angular';  // Pour les toasts
import { DocumentsService, MyDocument } from '../services/documents.service';
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
    private documentsService: DocumentsService,
    private toastController: ToastController
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
     this.pdfUrl=`${environment.apiLink}${doc.field_fichier}`;
     this.nomFichier= `${doc.title}.pdf`;}
     /* this.downloading = true;
          const url = `${environment.apiLink}${doc.field_fichier}`;
          const fileName = `${doc.title}.pdf`;

          const uri = await this.documentsService.downloadFile(url, fileName, (percent) => {
            this.progress = percent;
          });

          this.downloading = false;
          if (uri) {
            console.log('PDF téléchargé :', uri);

          }
        }*/

     // await  this.documentsService.downloadFile(  `${environment.apiLink}${doc.field_fichier}`,doc.title);}
        /*   if (success) {
             await this.showToast(`${doc.title} téléchargé et ouvert !`, 'success');
           } else {
             console.log('❌ Erreur lors du téléchargement');
              await this.showToast(`Erreur lors du téléchargement de ${doc.title}`, 'danger');
           }*/
 //  }

   // Affiche un toast avec un message et une couleur (success/danger/primary)
/*   async showToast(message: string, color: string = 'primary') {
     const toast = await this.toastController.create({
       message,
       duration: 2000, // Durée du toast 2 secondes
       color,
       position: 'bottom'
     });
     await toast.present();
   }


   private getLastSubstring(path: string): string {
     if (!path) return "";
     const parts = path.split('/');
     return parts[parts.length - 1]; // la dernière sous-chaîne
   }*/
 }

