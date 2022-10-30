import { Component, OnInit } from '@angular/core';
import { take, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiMovie } from 'src/interfaces/interface';
import { MovieService } from 'src/services/movie.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  nowPlayingMovies: ApiMovie[] | null = null;
  topRatedMovies: ApiMovie[] | null = null;
  posterPath: string = environment.apiImageUrl;

  constructor(private movieService: MovieService) {
    forkJoin([
      this.movieService.getPlayingMovies(),
      this.movieService.getTopRated(),
    ]).subscribe(([playing, rated]) => {
      this.nowPlayingMovies = playing;
      this.topRatedMovies = rated;
      console.log(playing);
    });
  }

  ngOnInit(): void {}
}
