import { Component } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { getLanguageFile } from 'src/app/utils/languages/langues';
import { openInfo, TYPES } from 'src/app/utils/utils';
import { environment } from 'src/environments/environment';
import { ApiMovie, ApiSerie, TranslationLanguage } from 'src/interfaces/interface';
import { MovieService } from 'src/services/movie.service';
import { SeriesService } from 'src/services/series.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent{
  nowPlayingMovies: ApiMovie[] | null = null;
  mostViewedMovies: ApiMovie[] | null = null;
  latestMovies: ApiMovie[] | null = null;
  latestSeries: ApiSerie[] | null = null;
  mostViewedSeries: ApiSerie[] | null = null;
  posterPath: string = environment.apiImageUrl;
  translation: TranslationLanguage | null = null;
  dialog: MatDialog;
  openInfo = openInfo;
  TYPES= TYPES;

  constructor(
    private movieService: MovieService,
    private serieService: SeriesService,
    private dialogRef: MatDialog
  ) {
    this.translation = getLanguageFile();
    this.dialog = dialogRef;
    forkJoin([
      this.movieService.getPlayingMovies(),
      this.movieService.getPopular(),
      this.serieService.getPopular(),
      this.movieService.getLatestMovies(),
      this.serieService.getLatestSeries(),
    ]).subscribe(
      ([playing, mostMovie, mostSerie, latestMovies, latestSeries]) => {
        this.nowPlayingMovies = playing;
        this.mostViewedMovies = mostMovie;
        this.mostViewedSeries = mostSerie;
        this.latestMovies = latestMovies.results;
        this.latestSeries = latestSeries.results;
      }
    );
  }
}
