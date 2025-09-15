
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SanitizeHtml } from 'src/core/sanitize-html';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-professiondefoi',
  templateUrl: './professiondefoi.component.html',
  styleUrls: ['./professiondefoi.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, SanitizeHtml]
})

export class ProfessiondefoiComponent {
  professiondefoi: any;
  response: any;

  constructor( private http: HttpClient ) {
    this.professiondefoi  = {
      "langcode": "English",
      "title": "Manifesto",
      "body": "<p><span>English version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here,&nbsp;</span></p>"
    }
    this.fetchProfessionDeFoi();
  }

  fetchProfessionDeFoi() {
    const url = `${environment.apiLink}/api/news`;
    this.http.get(url).subscribe(res => {
      this.response = res;
      console.log('Données reçues:', this.response);
    });
  }
}

