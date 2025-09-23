import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppFontAwesomeModule } from '../app-fontawesome.module';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SanitizeHtml } from 'src/core/sanitize-html';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, SanitizeHtml, AppFontAwesomeModule, HttpClientModule, CommonModule, TranslatePipe],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

})
export class HomePage {
  public environment = environment;
  public response: any = null;
  public userLang: string = 'fr';
  public logoCarre: string = '';

  constructor(private router: Router, private http: HttpClient) {
    this.fetchHome();
    this.fetchLogo();
    this.userLang = localStorage.getItem('lang') || 'fr';
  }

  fetchHome() {
  const url = `${environment.apiLink}/api/home`;
  let apiRes: any; 
    this.http.get(url).subscribe(res => {
      apiRes = res;
      this.response = apiRes.filter((item: any) => item.langcode === this.userLang)
      .map((item: any) => ({
        title: item.thematique || item.title || '',
        body: item.body || item.content || '',
        langcode: item.langcode || 'fr',
        nid: item.nid,
        field_imgapi: item.field_imgapi,
        field_logo: item.field_logo
      }));
      this.response = this.response[0];
    });
  }

  fetchLogo() {
    const url = `${environment.apiLink}/api/logo`;
    let apiRes: any; 
      this.http.get<any[]>(url).subscribe(res => {
        this.logoCarre = res[0].field_gallery_image;
        });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
