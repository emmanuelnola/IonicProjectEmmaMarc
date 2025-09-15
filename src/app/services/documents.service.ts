import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { Observable } from 'rxjs';

  // Modèle de données pour un document
  export interface MyDocument {
    id: number;
    title: string;
    field_fichier: string;
  }

  @Injectable({
    providedIn: 'root'
  })
  export class DocumentsService {

    // Ici on utilise HTTPS

    private apiUrl = 'https://presi.lab-123.com';

    constructor(private http: HttpClient) {}

    // GET pour récupérer les documents
    getDocuments(): Observable<MyDocument[]> {
      return this.http.get<MyDocument[]>(`${this.apiUrl}`+'/api/documents');
    }
  // Télécharge un fichier à partir de son chemin
    downloadDocument(filePath: string): Observable<Blob> {
      const fullUrl = `${this.apiUrl}${filePath}`; // ⚡ construit l'URL complète
      return this.http.get(fullUrl, { responseType: 'blob' });
    }
  }
