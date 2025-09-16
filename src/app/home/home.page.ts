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
  response: any = null;

  constructor(private router: Router, private http: HttpClient) {
    this.fetchHome();
  }

  fetchHome() {
  const url = `${environment.apiLink}/api/home`;
    this.http.get(url).subscribe(res => {
      this.response = res;
      this.response = this.response[0];
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
