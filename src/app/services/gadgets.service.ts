import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface représentant une image telle que stockée dans ta base de données
export interface MyImage {
  title: string; // Titre ou description
  path: string;  // Chemin vers l'image sur le serveur
}

@Injectable({
  providedIn: 'root'
})
export class GadgetsService {

  private apiUrl = 'https://presi.lab-123.com/api/images'; // Remplace par ton URL API

  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste des images depuis l'API
   */
  getImages(): Observable<MyImage[]> {
    return this.http.get<MyImage[]>(this.apiUrl);
  }
}
