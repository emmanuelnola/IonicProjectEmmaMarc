import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface MyAudio {
  title: string;
  field_audio: string; // chemin du fichier audio sur le serveur
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private apiUrl = environment.apiLink +'/api/audio'; // base URL du serveur

  constructor(private http: HttpClient) {}

  // Récupérer la liste des audios depuis l'API
  getAudios(): Observable<MyAudio[]> {
    return this.http.get<MyAudio[]>(this.apiUrl);
  }
}
