
import { Component, OnInit } from '@angular/core';
import { ToastController, IonicModule, AlertController } from '@ionic/angular';  // Pour les toasts
import { DownloadFileService ,MyDocument} from '../services/downloadFile.service';
import { Capacitor } from '@capacitor/core';
import { environment } from '../../environments/environment';
import { TranslatePipe } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  standalone: true,          // Composant standalone
  imports: [IonicModule ,CommonModule, TranslatePipe ]    // Nécessaire pour ion-list, ion-item, ion-button
})
export class DocumentsComponent implements OnInit {
  lang: string = 'fr';
  // Signal pour stocker et mettre à jour la liste des documents de manière réactive
  documents: MyDocument[] = [];
   loading: boolean = true;
   pdfUrl:string="";

   nomFichier:string="";
   progress = 0;
   downloading = false;
  fileName:string="";


   //variable necessaire au telechargement
     isDownloading =false;
      currentDownload!: MyDocument;
      downloadProgress = 0;
      message = '';
      downloadedBytes = 0;
      totalBytes = 0;
       visible:boolean=true;
       visibleMsgDownload:boolean=true
      /*-----*/

  constructor(
    private documentsService: DownloadFileService,
     private alertController: AlertController

  ) {}

  ngOnInit() {
    this.lang = localStorage.getItem('lang') || 'fr';
      this.documentsService.getDocuments().subscribe({
         next: (docs) => {
           this.documents = docs.filter((item: any) => item.langcode === this.lang);
           this.loading = false;
         },
         error: async (err) => {
           this.loading = false;
           console.error(err);

         }
       });

       // Configurer le callback de progression
          this.documentsService.setProgressCallback((progress) => {

             this.downloadProgress = progress;

              // Forcer la mise à jour de la vue
              setTimeout(() => {
               // Cette ligne force Angular à détecter les changements
               this.downloadProgress = progress;
                }, 0);
          });
  }


   async download(doc: MyDocument) {


          this.isDownloading = true;
           this.visible=false;
           this.currentDownload = doc;
           this.downloadProgress = 0;
           this.message = '';


     try {  this.fileName=this.getLastPathElement(`${environment.apiLink}${doc.field_fichier}`)
             const filePath = await this.documentsService.downloadFile(`${environment.apiLink}${doc.field_fichier}`,this.fileName);

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
       this.isDownloading = false;
       this.currentDownload = doc;
       this.visible=true;



   }

    private async showAlert(header: string, message: string) {
          const alert = await this.alertController.create({
            header,
            message,
            buttons: ['OK']
          });
          await alert.present();
    }

  private getLastPathElement(path: string): string {
              const segments = path.split('/').filter(segment => segment !== '');
              return segments.length > 0 ? segments[segments.length - 1] : '';
   }

}



