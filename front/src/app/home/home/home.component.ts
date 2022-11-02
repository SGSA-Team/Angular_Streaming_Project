import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take, forkJoin } from 'rxjs';
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

  openInfo = (movie: ApiMovie | ApiSerie) => {
    this.dialog.open(DialogInfoComponent, {
      minWidth: '80%',
      minHeight: '800px',
      data: movie,
    });
  };
}

@Component({
  selector: 'dialog-info',
  templateUrl: './dialog-info.html',
  styleUrls: ['./home.component.scss'],
})
export class DialogInfoComponent {
  currentMovie: ApiMovie | ApiSerie | null = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ApiMovie | ApiSerie,
    public dialogRef: MatDialogRef<DialogInfoComponent>
  ) {
    this.currentMovie = data;
    console.log(data);
  }
}
