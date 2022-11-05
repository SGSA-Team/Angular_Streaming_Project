import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take, forkJoin } from 'rxjs';
import {
  ModalComponent,
  MediaType,
} from 'src/app/components/modal/modal.component';
import { environment } from 'src/environments/environment';
import { ApiMovie, ApiSerie } from 'src/interfaces/interface';
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

  constructor(
    private movieService: MovieService,
    private serieService: SeriesService,
    private router: Router,
    private dialog: MatDialog
  ) {
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

        console.log(playing, this.latestMovies, latestMovies);
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
