import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import {
  ModalComponent,
  MediaType,
} from 'src/app/components/modal/modal.component';
import { getLanguageFile } from 'src/app/utils/languages/langues';
import { environment } from 'src/environments/environment';
import { ApiMovie, ApiSerie, TranslationLanguage } from 'src/interfaces/interface';
import { MovieService } from 'src/services/movie.service';
import { SeriesService } from 'src/services/series.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  nowPlayingMovies: ApiMovie[] | null = null;
  mostViewedMovies: ApiMovie[] | null = null;
  latestMovies: ApiMovie[] | null = null;
  latestSeries: ApiSerie[] | null = null;
  mostViewedSeries: ApiSerie[] | null = null;
  posterPath: string = environment.apiImageUrl;
  translation: TranslationLanguage | null = null;

  constructor(
    private movieService: MovieService,
    private serieService: SeriesService,
    private dialog: MatDialog
  ) {
    this.translation = getLanguageFile();
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
  ngOnInit(): void {}

  openInfo = (movie: ApiMovie | ApiSerie, type: MediaType) => {
    this.dialog.open(ModalComponent, {
      minWidth: '50vw',
      maxWidth: '50vw',
      minHeight: '75vh',
      maxHeight: '75vh',
      data: {
        data: movie,
        type: type,
      },
    });
  };
}
