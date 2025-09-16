
import { Component } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AppFontAwesomeModule } from './app-fontawesome.module';
import { GaleriePhotosComponent } from './galerie-photos/galerie-photos.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule, AppFontAwesomeModule, GaleriePhotosComponent, TranslatePipe],
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showLogo = false;
  showHeader: boolean = true;
  currentRoute: string = '';
  currentLang: string = 'fr';
  logoUrl:string = '';
  public environment = environment;

  constructor(private menu: MenuController, private router: Router, private translate: TranslateService, private http: HttpClient) {
    // Initialize language from localStorage or default to 'fr'
    const savedLang = localStorage.getItem('lang');
    this.currentLang = savedLang || 'fr';
    this.translate.setDefaultLang('fr');
    this.translate.use(this.currentLang);

    const url = `${environment.apiLink}/api/logo-rec`;
      this.http.get<{ field_gallery_image: string }[]>(url).subscribe(res => {
        this.logoUrl = res[0]?.field_gallery_image || '';
      });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Hide logo on '/home', show otherwise
        this.showLogo = (event.urlAfterRedirects !== '/home' && event.url !== '/');
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  setLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  closeMenuAndNavigate(path: string) {
    this.router.navigate([path]);
    this.menu.close();
  }

  closeMenu() {
    this.menu.close();
  }
}
