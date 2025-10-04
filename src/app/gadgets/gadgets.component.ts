
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { GadgetsService } from '../services/gadgets.service'; // Service pour récupérer les gadgets

// Modèle pour le gadget
interface Gadget {
  title: string;
  images: string[]; // Tableau d'URLs des images
}

@Component({
  selector: 'app-gadgets',
  templateUrl: './gadgets.component.html',
  styleUrls: ['./gadgets.component.scss'],
  standalone: true,

  imports: [CommonModule, IonicModule],

})
export class GadgetsComponent implements OnInit {
   lang: string = 'fr';
  gadgets: Gadget[] = [];      // Lise des gadgets récupérés
  loading: boolean = true;     // Indique si les données sont en cours de chargement
   private apiUrl: string =environment.apiLink;// Racine du serveur


  constructor(private gadgetsService: GadgetsService) {}

  ngOnInit() {
      this.lang = localStorage.getItem('lang') || 'fr';

    // ⚡ Récupère les gadgets depuis l'API
    this.gadgetsService.getGadgets().subscribe({
      next: (data: any[]) => {
        // Pour chaque gadget, transformer la chaîne d'images en tableau
        this.gadgets = data.map(g => ({
          title: g.title,
          langcode:g.langcode,
          images: g.field_gallery_image
                    .split(',')             // Sépare les URLs par virgule
                    .map((s: string) => s.trim())     // Supprime les espaces superflus
                    .map((s: string) => `${this.apiUrl}${s}`) // Ajoute la racine du serveur

        }))
        .filter((item: any) => item.langcode === this.lang);

        this.loading = false; // Les données sont prêtes → on enlève le spinner
      },
      error: (err) => {
        console.error('Erreur récupération gadgets :', err);
        this.loading = false; // Même en cas d'erreur, on arrête le spinner
      }
    });
  }

}
