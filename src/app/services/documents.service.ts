
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@capacitor-community/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Filesystem } from '@capacitor/filesystem'; // Pour stocker les fichiers sur mobile
import { FileOpener } from '@capacitor-community/file-opener';  // Pour ouvrir le PDF
import {  HttpDownloadFileResult } from '@capacitor-community/http';
import { Filesystem, Directory } from '@capacitor/filesystem'; // Pour stocker les fichiers sur mobile
import { FileOpener } from '@capacitor-community/file-opener';  // Pour ouvrir le PDF


export interface MyDocument {
  title: string;
  field_fichier: string; // URL vers le PDF
}

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http: HttpClient,  private toastController: ToastController) {}
      private apiUrl = environment.apiLink +'/api/documents';

    // Récupérer la liste des audios depuis l'API
    getDocuments(): Observable<MyDocument[]> {
      return this.http.get<MyDocument[]>(this.apiUrl);
    }


    // Télécharge et sauvegarde le PDF
    async downloadAndOpenPdf(fileUrl: string, fileName: string) {
       try {


           const isAndroid = Capacitor.getPlatform() === 'android';
           // Sur Android, on met tout dans le sandbox, pas besoin de permission supplémentaire
            // Sur iOS, Directory.Documents correspond au sandbox de l'app
           const fileDirectory = isAndroid ? undefined : Directory.Documents;

            await this.showToast(`debut du telechargement : `, 'primary');
         // Télécharger le fichier
               const result = await Http.downloadFile({
                 url: fileUrl,
                 filePath: fileName,
                 fileDirectory: fileDirectory as Directory | undefined,
               });
              await this.showToast(`j'ai traversé le telechargement de: ${fileName}`, 'primary');
                                                         await this.delay(3000);

              if (result.path) {
                           console.log('Fichier téléchargé ici :', result.path);

                           // Ouvre le PDF
                           await FileOpener.open({
                             filePath: result.path,
                             contentType: 'application/pdf',
                           });

                           await this.showToast(`Téléchargement terminé : ${fileName}`, 'success');
                         } else {
                           throw new Error('Impossible de télécharger le PDF');
                         }
                       }catch (error) {
                              console.error('Erreur téléchargement PDF :', error);
                              await this.showToast('Erreur lors du téléchargement', 'danger');
                     }
       }




       // Convertir ArrayBuffer → Base64
         private arrayBufferToBase64(buffer: ArrayBuffer): string {
           let binary = '';
           const bytes = new Uint8Array(buffer);
           const len = bytes.byteLength;
           for (let i = 0; i < len; i++) {
             binary += String.fromCharCode(bytes[i]);
           }
           return btoa(binary);
         }

      private delay(ms: number) {
         return new Promise(resolve => setTimeout(resolve, ms));
       }

      private async showToast(message: string, color: 'success' | 'danger' | 'primary' = 'primary') {
          const toast = await this.toastController.create({
            message,
            duration: 3000,
            color,
            position: 'bottom',
          });
          await toast.present();
        }

       //le nom du document c'est la  derniere sous chaines de  chaine avec comme separateur \
       private getLastSubstring(path: string): string {
           if (!path) return "";
           const parts = path.split('/');
           return parts[parts.length - 1]; // la dernière sous-chaîne
         }

}






























