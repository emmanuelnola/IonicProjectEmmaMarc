
import { Component } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showLogo = false;

  constructor(private menu: MenuController, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Hide logo on '/home', show otherwise
        this.showLogo = (event.urlAfterRedirects !== '/home' && event.url !== '/');
        console.log(event.urlAfterRedirects);
      });
  }

  closeMenuAndNavigate(path: string) {
    this.router.navigate([path]);
    this.menu.close();
  }

  closeMenu() {
    this.menu.close();
  }
}
