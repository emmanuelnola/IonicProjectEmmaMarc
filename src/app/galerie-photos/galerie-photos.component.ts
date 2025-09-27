import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
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
  loading = false;
  imageKey = 0;
  previewCategoryIndex = 0;
  previewImageIndex = 0;
  public userLang: string = 'fr';
  categories: Array<{ title: string, images: Array<{ url: string, thumb: string }> }> = [];
  environment = environment;

  constructor(private http: HttpClient) {
    this.userLang = localStorage.getItem('lang') || 'fr';
    this.fetchImages();
  }

  ngOnInit() {
    
  }

  fetchImages() {
    this.http.get<any[]>(`${environment.apiLink}/api/galerie`).subscribe(apiResponse => {
      let imagesToMap = apiResponse.filter( x => x.langcode = this.userLang );
      this.categories = imagesToMap.map(item => {
        const galleryArr = item.gallerie.split(',').map((s: string) => s.trim());
        const vignetteArr = item.vignette.split(',').map((s: string) => s.trim());
        const images = galleryArr.map((url: string, i: number) => ({
          url,
          thumb: vignetteArr[i] || ''
        }));
        return {
          title: item.title,
          images
        };
      });
    });
  }

  openPreview(categoryIdx: number, imageIdx: number) {
    this.previewCategoryIndex = categoryIdx;
    this.previewImageIndex = imageIdx;
    this.previewOpen = true;
    this.loading = true;
    this.imageKey++;
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
      this.loading = true;
      this.imageKey++;
    }
  }

  prevImage() {
    if (this.previewImageIndex > 0) {
      this.previewImageIndex--;
      this.loading = true;
      this.imageKey++;
    }
  }
  onImageLoad() {
    this.loading = false;
  }

  get previewImage() {
    return this.categories[this.previewCategoryIndex]?.images[this.previewImageIndex];
  }
}
