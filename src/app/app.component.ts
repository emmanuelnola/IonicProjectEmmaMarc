
import { Component } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, RouterModule],
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private menu: MenuController, private router: Router) {}

  closeMenuAndNavigate(path: string) {
    // Try closing by menuId first, then navigate, then close default menu as fallback
    this.router.navigate([path]);
    this.menu.close();
  }

  closeMenu() {
    this.menu.close();
  }
}
