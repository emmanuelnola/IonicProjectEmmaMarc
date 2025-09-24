
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Filesystem } from '@capacitor/filesystem'; // Pour stocker les fichiers sur mobile
import { FileOpener } from '@capacitor-community/file-opener';  // Pour ouvrir le PDF
import { Http, HttpDownloadFileResult } from '@capacitor-community/http';



export interface MyDocument {
  title: string;
  field_fichier: string; // URL vers le PDF
}

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  constructor(private http: HttpClient,   private platform: Platform) {}
      private apiUrl = environment.apiLink +'/api/documents';

    // Récupérer la liste des audios depuis l'API
    getDocuments(): Observable<MyDocument[]> {
      return this.http.get<MyDocument[]>(this.apiUrl);
    }
//supprimé


}






























