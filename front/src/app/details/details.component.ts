import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { filter, forkJoin, Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiMovie, ApiSerie } from 'src/interfaces/interface';
import { MovieService } from 'src/services/movie.service';
import { SeriesService } from 'src/services/series.service';
import { DialogInfoComponent } from '../home/home/home.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  posterPath: string = environment.apiImageUrl;
  currentVideoUrl: string = '';
  media?: ApiMovie | ApiSerie;
  mediaType: string = '';
  video: any;

  constructor(
    private serieService: SeriesService,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    let observer: Observable<ApiMovie | ApiSerie>;
    let videoObservser: Observable<any>;
    this.route.url.subscribe((url) => {
      const id = url[2].path;
      this.mediaType = url[1].path;
      switch (this.mediaType) {
        case 'serie': {
          observer = this.serieService.getSerieFromId(id);
          videoObservser = this.serieService.getVideos(id);

          break;
        }
        case 'movie': {
          videoObservser = this.movieService.getVideos(id);
          observer = this.movieService.getMovieFromId(id);
          break;
        }
        default: {
          new Error('pas bon');
        }
      }
      forkJoin([observer, videoObservser]).subscribe(([media, videos]) => {
        console.log(media);
        this.media = media;
        this.video = videos.results.find((v: any) => {
          return v.site === 'YouTube';
        });
        this.currentVideoUrl = `http://www.youtube.com/embed/${this.video.key}`;
      });
    });
  }

  openMoreDetails = (media: ApiMovie | ApiSerie) => {
    this.dialog.open(DialogInfoComponent, {
      minWidth: '80%',
      minHeight: '800px',
      data: media,
    });
  };

  ngOnInit(): void {}
}
