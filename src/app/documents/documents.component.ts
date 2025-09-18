

import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filesystem, Directory } from '@capacitor/filesystem'; // Pour stocker les fichiers sur mobile
import { FileOpener } from '@capacitor-community/file-opener';  // Pour ouvrir le PDF
import { ToastController, IonicModule } from '@ionic/angular';  // Pour les toasts
import { DocumentsService, MyDocument } from '../services/documents.service';
import { Capacitor } from '@capacitor/core';
import { environment } from '../../environments/environment';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  standalone: true,          // Composant standalone
  imports: [IonicModule ,CommonModule ]    // Nécessaire pour ion-list, ion-item, ion-button
})
export class DocumentsComponent implements OnInit {

  // Signal pour stocker et mettre à jour la liste des documents de manière réactive
  documents: MyDocument[] = [];
   loading: boolean = true;

  constructor(
    private documentsService: DocumentsService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
      this.documentsService.getDocuments().subscribe({
         next: (docs) => {
           this.documents = docs;
           this.loading = false;
         },
         error: async (err) => {
           this.loading = false;
           console.error(err);
           await this.showToast('Impossible de charger les documents', 'danger');
         }
       });
   }


   // Fonction pour télécharger et ouvrir un document PDF
   async download(doc: MyDocument) {
     try {
       this.loading = false;
       //  Télécharger le PDF depuis l'URL
       console.log(`${environment.apiLink}${doc.field_fichier}`);
       console.log(`${environment.apiLink}${doc.field_fichier}`);
       const response = await fetch(`${environment.apiLink}${doc.field_fichier}`);

       console.log('bonjour');
       if (!response.ok) throw new Error('Impossible de télécharger le PDF');
       const blob = await response.blob();
       console.log('bonjour 2');
       const arrayBuffer = await blob.arrayBuffer();
       const base64Data = this.arrayBufferToBase64(arrayBuffer); // Convertir en base64 pour Capacitor

       //  Choisir le répertoire selon la plateforme
       const directory = Capacitor.getPlatform() === 'ios' ? Directory.Documents : Directory.External;

       //  Générer un nom unique pour éviter d'écraser d'autres fichiers
       const timestamp = new Date().getTime();
       const fileName = `${doc.title}_${timestamp}.pdf`;

       //  Écrire le fichier sur le mobile
       const savedFile = await Filesystem.writeFile({
         path: fileName,
         data: base64Data,
         directory: directory,
         recursive: true
       });

       //  Ouvrir le PDF avec l'application PDF par défaut
       await FileOpener.open({
         filePath: savedFile.uri,
         contentType: 'application/pdf'
       });

       //  Afficher un toast vert pour succès
       await this.showToast(`${doc.title} téléchargé et ouvert !`, 'success');

     } catch (error) {
        this.loading = false;
       console.error(error);
       // Afficher un toast rouge si erreur
       await this.showToast(`Erreur lors du téléchargement de ${doc.title}`, 'danger');
     }
   }

   // Convertit un ArrayBuffer en base64 pour Capacitor Filesystem
   arrayBufferToBase64(buffer: ArrayBuffer) {
     let binary = '';
     const bytes = new Uint8Array(buffer);
     bytes.forEach(b => binary += String.fromCharCode(b));
     return btoa(binary);
   }

   // Affiche un toast avec un message et une couleur (success/danger/primary)
   async showToast(message: string, color: string = 'primary') {
     const toast = await this.toastController.create({
       message,
       duration: 2000, // Durée du toast 2 secondes
       color,
       position: 'bottom'
     });
     await toast.present();
   }
 }
