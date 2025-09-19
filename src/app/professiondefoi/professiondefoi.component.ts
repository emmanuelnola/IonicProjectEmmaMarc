
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SanitizeHtml } from 'src/core/sanitize-html';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-professiondefoi',
  templateUrl: './professiondefoi.component.html',
  styleUrls: ['./professiondefoi.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, SanitizeHtml, FormsModule, TranslatePipe]
})

export class ProfessiondefoiComponent {
  
  professiondefoi: any;
  response: any;
  lang: string = 'fr';
  environment = environment;
  
  constructor( private http: HttpClient ) {
    this.professiondefoi  = {
      "langcode": "English",
      "title": "Manifesto",
      "body": "<p><span>Chargement en cours....</span></p>"
    }
    this.lang = localStorage.getItem('lang') || 'fr';
    this.fetchProfessionDeFoi();
  }

  fetchProfessionDeFoi() {
    const url = `${environment.apiLink}/api/profession`;
    this.http.get(url).subscribe(res => {
      this.response = res;
      this.professiondefoi = this.response[0]
      this.onLangChange();
    });
  }

  onLangChange() {    
    this.professiondefoi = this.response
      .filter((item: any) => item.langcode === this.lang)
      .map((item: any) => ({
        title: item.thematique || item.title || '',
        body: item.body || item.content || '',
        langcode: item.langcode || 'fr',
        nid: item.nid
      }));

    this.professiondefoi = this.professiondefoi[0];
  }
}

