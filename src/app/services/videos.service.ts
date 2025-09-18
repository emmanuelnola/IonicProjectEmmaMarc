import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Video {
  title: string;
  youtube: string; // lien YouTube
  titre: string,
  date: string,
  jour: string,
}

@Injectable({
  providedIn: 'root'
})
export class VideosService {
   private apiUrl = environment.apiLink +'/api/videos';
  // Remplace par l’URL réelle de ton serveur

  constructor(private http: HttpClient) {}

  // Récupère la liste des vidéos
  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.apiUrl);
  }
}
