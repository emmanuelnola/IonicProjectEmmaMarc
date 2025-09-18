import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


export interface MyDocument {
  title: string;
  field_fichier: string; // URL vers le PDF
}

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  constructor(private http: HttpClient) {}
      private apiUrl = environment.apiLink +'/api/documents';

    // Récupérer la liste des audios depuis l'API
    getDocuments(): Observable<MyDocument[]> {
      return this.http.get<MyDocument[]>(this.apiUrl);
    }



}






























