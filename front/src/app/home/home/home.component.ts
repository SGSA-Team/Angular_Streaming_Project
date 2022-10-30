import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
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
  posterPath: string = environment.apiImageUrl;

  constructor(private movieService: MovieService) {
    this.movieService.getPlayingMovies().subscribe((movies) => {
      this.nowPlayingMovies = movies;
      console.log(movies);
    });
  }

  ngOnInit(): void {}
}
