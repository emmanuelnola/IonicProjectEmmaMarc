import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SanitizeHtml } from 'src/core/sanitize-html';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-actualites',
  standalone: true,
  imports: [CommonModule, IonicModule, SanitizeHtml, HttpClientModule],
  templateUrl: './voir-actualite.component.html',
  styleUrls: ['./voir-actualite.component.scss']
})
export class VoirActualiteComponent {
  actualite: any = null;
  lang: string = 'fr';
  environment = environment;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.lang = localStorage.getItem('lang') || 'fr'; 
    this.route.paramMap.subscribe(params => {
      const nid = params.get('nid');
      if (nid) {
        this.http.get(`${environment.apiLink}/api/news/${nid}`).subscribe(data => {
          const newsArray = Array.isArray(data) ? data : [];
          this.actualite =  newsArray
          .filter((item: any) => item.langcode == this.lang)
          .map((item: any) => ({
            titre: item.thematique || item.title || '',
            date: item.created,
            langcode: ( item.langcode == 'en' ) ? 'en' : 'fr',
            src: item.field_image,
            nid: item.nid,
            content: item.body
          }))[0];
          console.log('Fetched actualite:', this.actualite);
        });
      }
    });
  }
}
