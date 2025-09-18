import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GadgetsService {

   private apiUrl = environment.apiLink +'/api/gadgets';

  constructor(private http: HttpClient) {}

  // ⚡ Récupère les gadgets depuis le serveur
  getGadgets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
