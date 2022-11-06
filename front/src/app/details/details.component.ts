import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiMovie, ApiSerie, TranslationLanguage } from 'src/interfaces/interface';
import { MovieService } from 'src/services/movie.service';
import { SeriesService } from 'src/services/series.service';
import { DateHelper, openInfo, TYPES, YOUTUBE_EMBED_SRC} from 'src/app/utils/utils';
import { getLanguageFile } from '../utils/languages/langues';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  //TRANSLATE
  tooltipMessage: string = 'Copier le lien';
  posterPath: string = environment.apiImageUrl;
  currentVideoUrl: string = '';
  media?: ApiMovie | ApiSerie;
  apiImageUrl: string = environment.apiImageUrl;
  peoples: any;
  mediaType: string = '';
  video: any;
  note: number = 0;
  translation: TranslationLanguage | null = null;
  dialog: MatDialog;
  openInfo = openInfo; 

  constructor(
    private serieService: SeriesService,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private dialogRef: MatDialog
  ) {
    this.translation = getLanguageFile();
    this.dialog = dialogRef;
    let observer: Observable<ApiMovie | ApiSerie>;
    let videoObservser: Observable<any>;
    let peopleObsever: Observable<any>;

    this.route.url.subscribe((url) => {
      const id = url[2].path;
      this.mediaType = url[1].path;
      switch (this.mediaType) {
        case TYPES.serie: {
          observer = this.serieService.getSerieFromId(id);
          videoObservser = this.serieService.getVideos(id);
          peopleObsever = this.serieService.getPeoples(id);
          break;
        }
        case TYPES.movie: {
          peopleObsever = this.movieService.getPeoples(id);
          videoObservser = this.movieService.getVideos(id);
          observer = this.movieService.getMovieFromId(id);
          break;
        }
        default: {
          new Error('wrong type !');
        }
      }
      forkJoin([observer, videoObservser, peopleObsever]).subscribe(
        ([media, videos, peoples]) => {
          console.log(media, peoples);
          this.media = media;
          this.peoples = peoples;
          this.video = videos.results.find((v: any) => {
            return v.site === 'YouTube' && v?.key;
          });
          this.note = Math.ceil(media.vote_average / 2);
          this.currentVideoUrl = `${YOUTUBE_EMBED_SRC}${this.video?.key}`;
        }
      );
    });
  }

  getAddedDate(date: string) {
    return DateHelper.diffDateToNow(new Date(date));
  }

  noteStars = () => {
    let tabStar: { full: boolean }[] = [];
    let noteStar: number = this.note;
    for (let index = 0; index < 5; index++) {
      noteStar--;
      tabStar.push({ full: noteStar >= 0 });
    }
    return tabStar;
  };

  //TRANSLATE
  copiedTooltip = () => {
    const shareData: ShareData = {
      title: 'SDStreaming',
      text: 'Regarde ce film il est super !',
      url: document.URL,
    };
    this.tooltipMessage = 'Copié !';
    setTimeout(() => {
      this.tooltipMessage = 'Copier le lien';
    }, 3000);
    navigator.clipboard.writeText(document.URL);
    navigator.share(shareData);
  };

}
