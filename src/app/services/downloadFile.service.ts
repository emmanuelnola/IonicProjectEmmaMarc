import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Filesystem, Directory } from '@capacitor/filesystem';

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
    // Callback pour la progression
    private progressCallback: ((progress: number) => void) | null = null;


  constructor(private http: HttpClient) {}

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

    async download(audioUrl: string, fileName: string): Promise<string> {
       return new Promise((resolve, reject) => {
         const xhr = new XMLHttpRequest();

         xhr.open('GET', audioUrl, true);
         xhr.responseType = 'blob';

         // ✅ VÉRITABLE GESTION DE LA PROGRESSION
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
                  this.progressCallback(0);
                }
          };

         xhr.onload = async () => {
           console.log('Téléchargement terminé, statut:', xhr.status);
           if (xhr.status === 200) {
             try {
               const blob = xhr.response;
               console.log('Taille du blob:', blob.size);

            // ✅ FORCER une progression à 50% pendant la conversion
             if (this.progressCallback) {
                 this.progressCallback(50);
             }

               const base64Data = await this.blobToBase64(blob);

              // ✅ FORCER une progression à 75% pendant la sauvegarde
               if (this.progressCallback) {
                  this.progressCallback(75);
                }

               const result = await Filesystem.writeFile({
                 path: fileName,
                 data: base64Data,
                 directory: Directory.Documents,
                 recursive: true
               });

               if (this.progressCallback) {
                 this.progressCallback(100); // Progression à 100%
               }

              console.log('Fichier sauvegardé:', result.uri);
              resolve(result.uri);

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
