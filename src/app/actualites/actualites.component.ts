import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TranslatePipe } from '@ngx-translate/core';
import { SanitizeHtml } from 'src/core/sanitize-html';

@Component({
  selector: 'app-actualites',
  standalone: true,
  imports: [CommonModule, IonicModule, HttpClientModule, TranslatePipe, SanitizeHtml],
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.scss']
})
export class ActualitesComponent {
  response: any = [];
  lang: string = 'fr';
  environment = environment;


  constructor(private router: Router, private http: HttpClient) {
    this.lang = localStorage.getItem('lang') || 'fr';
    this.fetchNews();
  }

  fetchNews() {
    const url = `${environment.apiLink}/api/news`;
    this.http.get(url).subscribe((res: any) => {
      const newsArray = Array.isArray(res) ? res : [];
      this.response = newsArray
      .filter((item: any) => item.langcode === this.lang)
      .map((item: any) => ({
        titre: item.thematique || item.title || '',
        date: item.created,
        langcode: item.langcode || 'fr',
        src: item.field_image,
        nid: item.nid
      }));
    });
  }

  voirActualite(nid: string | number) {
    console.log('Navigating to actualite with nid:', nid);
    // Navigue vers la page de l'actualité avec le nid sélectionné
    this.router.navigate(['/voir-actualites', nid]);
  }


}
