
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
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

  gadgets: Gadget[] = [];      // Liste des gadgets récupérés
  loading: boolean = true;     // Indique si les données sont en cours de chargement
  private apiUrl = 'https://presi.lab-123.com'; // Racine du serveur

  constructor(private gadgetsService: GadgetsService) {}

  ngOnInit() {
    // ⚡ Récupère les gadgets depuis l'API
    this.gadgetsService.getGadgets().subscribe({
      next: (data: any[]) => {
        // Pour chaque gadget, transformer la chaîne d'images en tableau
        this.gadgets = data.map(g => ({
          title: g.title,
          images: g.field_gallery_image
                    .split(',')             // Sépare les URLs par virgule
                    .map((s: string) => s.trim())     // Supprime les espaces superflus
                    .map((s: string) => `${this.apiUrl}${s}`) // Ajoute la racine du serveur
        }));
        this.loading = false; // Les données sont prêtes → on enlève le spinner
      },
      error: (err) => {
        console.error('Erreur récupération gadgets :', err);
        this.loading = false; // Même en cas d'erreur, on arrête le spinner
      }
    });
  }

}
