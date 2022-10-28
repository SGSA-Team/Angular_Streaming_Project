import { Component, OnInit } from '@angular/core';
import { ApiMovie } from 'src/interfaces/interface';
import { MovieService } from 'src/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movieTest: ApiMovie | null = null;
  constructor(private movieService: MovieService) {
    this.movieService.getMoviesFromId('12').subscribe((t) => {
      console.log(t);
    });
  }

  ngOnInit(): void {}
}
