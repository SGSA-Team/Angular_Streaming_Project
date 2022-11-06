import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { getLanguageFile } from 'src/app/utils/languages/langues';
import { ApiMovie, ApiSerie, ApiVideo, TranslationLanguage } from 'src/interfaces/interface';
import { MovieService } from 'src/services/movie.service';
import { SeriesService } from 'src/services/series.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() currentMovie: ApiMovie | ApiSerie | null = null;
  ytb_key: string | null = null;
  ytb_link: string | null = null;
  detailPageLink: string = ""
  translation: TranslationLanguage | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      data: ApiMovie | ApiSerie;
      type: MediaType;
      link: string;
    },
    @Inject(MAT_DIALOG_DATA) public type: string,
    public dialogRef: MatDialogRef<ModalComponent>,
    private movieService: MovieService,
    private seriesService: SeriesService,
    public sanitizer: DomSanitizer
  ) {
    this.translation = getLanguageFile();
    this.detailPageLink = data.link;
    this.currentMovie = data.data;
    this.fetchData(this.currentMovie.id, data.type);
  }

  getYoutubeLink(key: string) {
    return `https://www.youtube.com/embed/${key}?playlist=${key}&loop=1`;
  }

  async fetchData(id: number, type: string) {
    let ref: MovieService | SeriesService = this.movieService;
    switch (type.toLowerCase()) {
      case 'movie': {
        ref = this.movieService;
        break;
      }
      case 'serie': {
        ref = this.seriesService;
        break;
      }
      default: {
        ref = this.movieService;
      }
    }
    ref.getVideo(id).subscribe((data) => {
      const ytb_link = data.results.filter(
        (f: ApiVideo) => f.site.toLowerCase() === 'youtube'
      )[0];
      if (ytb_link && ytb_link.key) {
        this.ytb_key = ytb_link.key;
        this.ytb_link = this.getYoutubeLink(ytb_link.key);
      }
    });
  }
}

export type MediaType = 'movie' | 'serie';
