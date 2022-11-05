import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ApiMovie, ApiMovies, ApiSerie, ApiSeries } from 'src/interfaces/interface';
import { MovieService } from 'src/services/movie.service';
import { SeriesService } from 'src/services/series.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';

interface CatalogsFilters {
    dateCreatdAt: boolean,
    popularity:boolean,
    note: boolean,
}
interface GenreI {
  id: number;
  name: string | null;
}
interface fetchDataInterface{
  page?: number ;
  genreId?: number;
}
@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent implements OnInit {

  filterSelected:CatalogsFilters={
    popularity:true,
    note: false,
    dateCreatdAt:false,
  };
  movies: Partial<ApiMovies> = {};
  series: Partial<ApiSeries> = {};
  currentRoute:string=""
  options = {
    movies :{
      isSelected: false,
      title: "Films",
      type: "movie",
      filters: {
        popularity: (page:number=1, genreId:number=0) => this.movieService.getPopularMovies("desc", page, genreId),
        note: ( page:number=1, genreId:number=0) => this.movieService.getRatedMovies("desc", page, genreId),
        dateCreatdAt: (page:number=1, genreId:number=0) => this.movieService.getLatestMovies("desc", page, genreId),
      }
    },
    series:{
      isSelected: false,
      title: "Series",
      type: "serie",
      filters: {
        popularity: (page:number=1, genreId:number=0) =>  this.seriesService.getPopularSeries("desc", page, genreId),
        note: (page:number=1, genreId:number=0) =>  this.seriesService.getRatedSeries("desc", page, genreId),
        dateCreatdAt: (page:number=1, genreId:number=0) => this.seriesService.getLatestSeries("desc", page, genreId),
      }
    }
  }
  title=""
  type=""
  filterOn:string = "popularity" as string
  currentPage:number = 1;
  totalPages:number = 1;
  genre:GenreI | undefined;
  isGenre=false;
  defaultCardImage = 'https://mergejil.mn/mergejilmn/no-image.jpeg'

  constructor(
    private route: ActivatedRoute,private router: Router,
    private movieService:MovieService, private seriesService:SeriesService,
    private dialog: MatDialog) { 
        this.router.events.pipe(
          filter((event:any) => event instanceof NavigationEnd)
        ).subscribe((event: any) => {
          this.currentRoute = event.url;  
          this.options = {
            ...this.options,
            movies: {
              ...this.options.movies,
              isSelected: event.url.split("/").includes("movies"),
            },
            series: {
              ...this.options.series,
              isSelected: event.url.split("/").includes("series"),
            }
          }
          Object.entries(this.options).find(([key, value]) => {
            if (value.isSelected) {
              this.title = value.title;
              this.type = value.type;
              return true;
            }
            return false;
          });
          if(this.route.snapshot.queryParamMap.get('id') && this.route.snapshot.queryParamMap.get('name')){
              this.genre = {
                id: parseInt(this.route.snapshot.queryParamMap.get('id') as string),
                name: this.route.snapshot.queryParamMap.get('name')
              } ;
              this.isGenre = true;
          }
           if(this.genre){
              this.fetchData({genreId: this.genre.id});
            }else {
              this.fetchData();
            }
        })
  }

  async fetchData({page=1, genreId=0}:fetchDataInterface={}){
    if(this.options.movies.isSelected && this.options.movies.filters[this.filterOn as keyof typeof this.options.movies.filters]){
    this.options.movies.filters[this.filterOn as keyof typeof this.options.movies.filters](page,genreId).subscribe((data) => {
      this.movies = data;
      this.currentPage = data.page;
      // tested on the api -> receive error over pagination 500
      this.totalPages = data.total_pages > 500 ? 500 : data.total_pages - 1;
    });
    }else if(this.options.series.isSelected && this.options.series.filters[this.filterOn as keyof typeof this.options.series.filters]){
    this.options.series.filters[this.filterOn as keyof typeof this.options.series.filters](page,genreId).subscribe((data) => {
      this.series = data;
      this.currentPage = data.page;
      this.totalPages = data.total_pages > 500 ? 500 : data.total_pages - 1;
    });
    }
  }

  async ngOnInit(): Promise<void> {
    //Allow to update page everytime params change but set href to "/" for navbar links 
    //this.router.routeReuseStrategy.shouldReuseRoute = () => false
    //No call required here because it's not dynamic
  }

  async updateFilter(filter:string){
    const newFiltersOptions =  Object
    .keys(this.filterSelected) 
    .reduce((result, k) =>{
      return { ...result, [k] : filter === k}
    }, {
    dateCreatdAt: false,
    popularity:false,
    note: false
  })
    this.filterSelected=newFiltersOptions; 
    Object.entries(this.filterSelected).find(([key, value]) => {
      if(value){
        this.filterOn = key;
      }
      return false;
    })
   if(this.genre && this.genre.id){
      this.fetchData({genreId: this.genre.id});
    }else {
      this.fetchData();
    }
  }

  pageChange(page:number){
    console.log(page)
     if(this.genre && this.genre.id){
      this.fetchData({page, genreId: this.genre.id});
    }else {
      this.fetchData({page});
    }
    return page;
  }

  getCardImageBg(path: string){
    return 'https://image.tmdb.org/t/p/original/'+path;
  }

  getRatingFormat(rating: number){
    return Math.round(rating)
  }

  openInfo = (movie: ApiMovie | ApiSerie, type:string) => {
    this.dialog.open(ModalComponent, {
      minWidth: '50vw',
      maxWidth: '50vw',
      minHeight: '75vh',
      maxHeight: '75vh',
      data: {
        data: movie,
        type: type
      }
    });
  };
}

