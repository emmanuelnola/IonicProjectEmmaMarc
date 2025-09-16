import { Component, Output, EventEmitter } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-galerie',
  standalone: true,
  imports: [CommonModule, IonicModule, TranslatePipe],
  templateUrl: './galerie-photos.component.html',
  styleUrls: ['./galerie-photos.component.scss']
})
export class GaleriePhotosComponent {
  @Output() previewState = new EventEmitter<boolean>();
  previewOpen = false;
  previewCategoryIndex = 0;
  previewImageIndex = 0;
  
  categories = [
    {
      titre: 'Un article avec des photos',
      date: "2024-06-15",
      images: [
        { thumb: 'assets/images/photo3.jpg', src: 'assets/images/photo3.jpg', title: 'Chat' },
        { thumb: 'assets/images/photo4.jpg', src: 'assets/images/photo4.jpg', title: 'Chat' },
        { thumb: 'assets/images/prod-1.jpg', src: 'assets/images/prod-1.jpg', title: 'Chat' },
        { thumb: 'assets/images/prod-2.jpg', src: 'assets/images/prod-2.jpg', title: 'Chat' },
        { thumb: 'assets/images/prod-3.jpg', src: 'assets/images/prod-3.jpg', title: 'Chat' },
        { thumb: 'assets/images/prod-4.jpg', src: 'assets/images/prod-4.jpg', title: 'Chat' },
        { thumb: 'assets/images/prod-5.jpg', src: 'assets/images/prod-5.jpg', title: 'Chat' },
        { thumb: 'assets/blackbird-7543630_640.jpg', src: 'assets/blackbird-7543630_640.jpg', title: 'Chien' },
      ]
    },
    {
      titre: 'Encore Un article avec des photos',
      date: "2024-06-15",
      images: [
        { thumb: 'assets/images/photo3.jpg', src: 'assets/images/photo3.jpg', title: 'Chat' },
        { thumb: 'assets/images/photo4.jpg', src: 'assets/images/photo4.jpg', title: 'Chat' },
        { thumb: 'assets/images/prod-1.jpg', src: 'assets/images/prod-1.jpg', title: 'Chat' },
        { thumb: 'assets/images/prod-2.jpg', src: 'assets/images/prod-2.jpg', title: 'Chat' },
        { thumb: 'assets/images/prod-3.jpg', src: 'assets/images/prod-3.jpg', title: 'Chat' },
        { thumb: 'assets/images/prod-4.jpg', src: 'assets/images/prod-4.jpg', title: 'Chat' },
        { thumb: 'assets/images/prod-5.jpg', src: 'assets/images/prod-5.jpg', title: 'Chat' },
        { thumb: 'assets/blackbird-7543630_640.jpg', src: 'assets/blackbird-7543630_640.jpg', title: 'Chien' },
      ]
    },
    {
      titre: 'Encore Un article avec des photos',
      date: "2024-06-15",
      images: [
        { thumb: 'assets/images/photo3.jpg', src: 'assets/images/photo3.jpg', title: 'Chat' },
        { thumb: 'assets/images/photo4.jpg', src: 'assets/images/photo4.jpg', title: 'Chat' },
        { thumb: 'assets/images/prod-1.jpg', src: 'assets/images/prod-1.jpg', title: 'Chat' },
        { thumb: 'assets/images/prod-2.jpg', src: 'assets/images/prod-2.jpg', title: 'Chat' },
        { thumb: 'assets/images/prod-3.jpg', src: 'assets/images/prod-3.jpg', title: 'Chat' },
        { thumb: 'assets/images/prod-4.jpg', src: 'assets/images/prod-4.jpg', title: 'Chat' },
        { thumb: 'assets/images/prod-5.jpg', src: 'assets/images/prod-5.jpg', title: 'Chat' },
        { thumb: 'assets/blackbird-7543630_640.jpg', src: 'assets/blackbird-7543630_640.jpg', title: 'Chien' },
      ]
    },
    {
      titre: 'Toujours un article avec des photos',
      date: "2024-06-15",
      images: [
        { thumb: 'assets/blackbird-7543630_640.jpg', src: 'assets/blackbird-7543630_640.jpg', title: 'Chat' },
        { thumb: 'assets/blackbird-7543630_640.jpg', src: 'assets/blackbird-7543630_640.jpg', title: 'Chien' },
        { thumb: 'assets/blackbird-7543630_640.jpg', src: 'assets/blackbird-7543630_640.jpg', title: 'Lion1' },
        { thumb: 'assets/blackbird-7543630_640.jpg', src: 'assets/blackbird-7543630_640.jpg', title: 'Lion3' },
        { thumb: 'assets/blackbird-7543630_640.jpg', src: 'assets/blackbird-7543630_640.jpg', title: 'Lion5' },
        { thumb: 'assets/blackbird-7543630_640.jpg', src: 'assets/blackbird-7543630_640.jpg', title: 'Lion6' },
        { thumb: 'assets/blackbird-7543630_640.jpg', src: 'assets/blackbird-7543630_640.jpg', title: 'Lion7' }
      ]
    }
  ];

  openPreview(categoryIdx: number, imageIdx: number) {
    this.previewCategoryIndex = categoryIdx;
    this.previewImageIndex = imageIdx;
    this.previewOpen = true;
    this.previewState.emit(true);
  }

  closePreview() {
    this.previewOpen = false;
    this.previewState.emit(false);
  }

  nextImage() {
    const images = this.categories[this.previewCategoryIndex].images;
    if (this.previewImageIndex < images.length - 1) {
      this.previewImageIndex++;
    }
  }

  prevImage() {
    if (this.previewImageIndex > 0) {
      this.previewImageIndex--;
    }
  }

  get previewImage() {
    return this.categories[this.previewCategoryIndex]?.images[this.previewImageIndex];
  }
}
