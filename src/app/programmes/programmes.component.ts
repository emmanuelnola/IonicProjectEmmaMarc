
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SanitizeHtml } from 'src/core/sanitize-html';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

  
@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, SanitizeHtml, HttpClientModule, FormsModule, TranslatePipe]
})
export class ProgrammesComponent {
  response: any;
  lang: string = 'fr';

  sections: Array<{ thematique: string; body: string }> = [];

  constructor(private http: HttpClient) {
    this.fetchProgramme();
    this.lang = localStorage.getItem('lang') || 'fr';
  }

  onLangChange() {
    if (!Array.isArray(this.response)) {
      this.sections = [];
      return;
    }
    if (this.lang === 'any') {
      this.sections = this.response.map((item: any) => ({
        thematique: item.thematique || item.title || '',
        body: item.body || item.content || '',
        langcode: item.langcode || 'fr',
        nid: item.nid
      }));
    } else {
      this.sections = this.response
        .filter((item: any) => item.langcode === this.lang)
        .map((item: any) => ({
          thematique: item.thematique || item.title || '',
          body: item.body || item.content || '',
          langcode: item.langcode || 'fr',
          nid: item.nid
        }));
    }
  }

  fetchProgramme() {
    const url = `${environment.apiLink}/api/programme`;
    this.http.get(url).subscribe(res => {
      this.response = res;
      // Map response to expected format if needed
      if (Array.isArray(res)) {
        this.sections = res
        .filter((item: any) => item.langcode === this.lang)
        .map((item: any) => ({
          thematique: item.thematique || item.title || '',
          body: item.body || item.content || '',
          langcode: item.langcode || 'fr',
          nid: item.nid 
        }));
      } else {
        this.sections = [];
      }
      this.onLangChange();
    });

  }
}

