import { Component, OnInit } from '@angular/core';
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
  mostViewedSeries: ApiSerie[] | null = null;

  posterPath: string = environment.apiImageUrl;

  constructor(
    private movieService: MovieService,
    private serieService: SeriesService
  ) {
    forkJoin([
      this.movieService.getPlayingMovies(),
      this.movieService.getPopular(),
      this.serieService.getPopular(),
    ]).subscribe(([playing, mostMovie, mostSerie]) => {
      this.nowPlayingMovies = playing;
      this.mostViewedMovies = mostMovie;
      this.mostViewedSeries = mostSerie;

      console.log(playing, mostSerie);
    });
  }

  ngOnInit(): void {}
}
