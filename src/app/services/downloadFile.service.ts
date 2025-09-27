import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {  Directory } from '@capacitor/filesystem';
// utile pour ancienne version import { Filesystem } from '@capacitor/filesystem';
//utile pour la nouvelle version
import writeFile from 'capacitor-blob-writer';

export interface MyAudio {
  title: string;
  field_audio: string; // chemin du fichier audio sur le serveur
}

export interface MyDocument {
  title: string;
  field_fichier: string; // URL vers le PDF
}

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {
  private apiUrlAudio = environment.apiLink +'/api/audio'; // base URL du serveur
  private apiUrlDoc = environment.apiLink +'/api/documents';

  constructor(private http: HttpClient) {}

   // Callback pour la progression
   private progressCallback: ((progress: number) => void) | null = null;


  // Récupérer la liste des audios depuis l'API
   getDocuments(): Observable<MyDocument[]> {
   return this.http.get<MyDocument[]>(this.apiUrlDoc);
   }

  // Récupérer la liste des audios depuis l'API
  getAudios(): Observable<MyAudio[]> {
    return this.http.get<MyAudio[]>(this.apiUrlAudio);
  }

   // Définir le callback de progression
    setProgressCallback(callback: (progress: number) => void) {
      this.progressCallback = callback;
    }

    async downloadFile(audioUrl: string,fileNom: string): Promise<string> {


       return new Promise((resolve, reject) => {

          const fileName = `${this.removeExtension(fileNom)}_${new Date().getTime()}.pdf`;
          console.log(fileName);
          const xhr = new XMLHttpRequest();

         xhr.open('GET', audioUrl, true);
         xhr.responseType = 'blob';

           // Timeout (2.5 min) un ajout
              xhr.timeout = 150000;

         //  VÉRITABLE GESTION DE LA PROGRESSION
               xhr.onprogress = (event) => {
                 console.log('Événement progression déclenché!', event.loaded, event.total);

                 if (event.lengthComputable && this.progressCallback) {
                   const percent = (event.loaded / event.total) * 100;
                   this.progressCallback(percent);
                 }
               };

         xhr.onloadstart = () => {
             console.log('Début du téléchargement');
              if (this.progressCallback) {
                  this.progressCallback(5); // 5% pour indiquer le début
                }
          };

         xhr.onload = async () => {
           console.log('Téléchargement terminé, statut:', xhr.status);
           if (xhr.status === 200) {
             try {
                 // j ai ahouté a l ancienne version as Blob
               const blob = xhr.response as Blob;
               console.log('Taille du blob:', blob.size);

            // ✅ FORCER une progression à 80% pendant la conversion
             if (this.progressCallback) {
                 this.progressCallback(80);
             }
              /* version précédente
               const base64Data = await this.blobToBase64(blob);

              // ✅ FORCER une progression à 90% pendant la sauvegarde
               if (this.progressCallback) {
                  this.progressCallback(90);
                }*/
              /*anciennce sauvegarde
               const result = await writeFile({
                 path: fileName,
                 data: base64Data,
                 directory: Directory.Documents,
                 recursive: true
               });*/

             //nouvelle sauvegarde
               const result = await writeFile({
                  path: fileName,
                   directory: Directory.Documents, // stable et sandboxé
                    blob,
                 });

               if (this.progressCallback) {
                 this.progressCallback(100); // Progression à 100%
               }

              console.log('Fichier sauvegardé:', result);
              resolve(result);

             } catch (error) {
               reject(error);
             }
           } else {
             reject(new Error(`Erreur HTTP: ${xhr.status}`));
           }
         };

         xhr.onerror = () => reject(new Error('Erreur réseau'));
         xhr.ontimeout = () => reject(new Error('Timeout'));
        //  Augmenter le timeout pour les gros fichiers
               xhr.timeout = 150000; // 2.5 minutes

         // Démarrer le téléchargement
          console.log('Envoi de la requête XHR...');
         xhr.send();
       });
     }

   //je veux enlever le .xxx de fin
   private removeExtension(fileName: string): string {
     const dotIndex = fileName.lastIndexOf('.');
     if (dotIndex === -1) return fileName; // pas d'extension trouvée
     return fileName.substring(0, dotIndex);
   }



     // Convertir blob en base64
      private blobToBase64(blob: Blob): Promise<string> {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64 = reader.result as string;
              resolve(base64.split(',')[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        }



}











