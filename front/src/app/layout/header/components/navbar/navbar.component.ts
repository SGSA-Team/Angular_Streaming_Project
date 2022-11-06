import { Component, OnInit, ViewChild } from '@angular/core';
import { TYPES } from 'src/app/utils/utils';
import { Genre } from 'src/interfaces/interface';
import { MovieService } from 'src/services/movie.service';
import { SeriesService } from 'src/services/series.service';
import { LinksListComponent } from './components/links-list/links-list.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild(LinksListComponent)
  private linkList: LinksListComponent = new LinksListComponent();
  TYPES = TYPES;
  options = [TYPES.movies, TYPES.series];
  clickOnMovies = false;
  clickOnSeries = false;

  moviesGenres: Genre[] = [];
  seriesGenres: Genre[] = [];

  constructor(
    private movieService: MovieService,
    private seriesService: SeriesService
  ) {}

  async ngOnInit(): Promise<void> {
    this.movieService.getMoviesCategories().subscribe((result) => {
      this.moviesGenres = result.genres;
    });
    this.seriesService.getSeriesCategories().subscribe((result) => {
      this.seriesGenres = result.genres;
    });
  }

  closeCategories(type: string) {
    this.linkList.onClickCategory(type);
  }
}
