
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SanitizeHtml } from 'src/core/sanitize-html';

@Component({
  selector: 'app-professiondefoi',
  templateUrl: './professiondefoi.component.html',
  styleUrls: ['./professiondefoi.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, SanitizeHtml]
})

export class ProfessiondefoiComponent {
  professiondefoi: any;

  constructor() {
    this.professiondefoi  = {
      "langcode": "English",
      "title": "Manifesto",
      "body": "<p><span>English version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here, english version here,&nbsp;</span></p>"
    }
  }
 
}

