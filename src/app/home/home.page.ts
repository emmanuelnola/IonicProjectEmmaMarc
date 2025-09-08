import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppFontAwesomeModule } from '../app-fontawesome.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, AppFontAwesomeModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

})
export class HomePage {
  
  constructor( private router: Router ){

  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
