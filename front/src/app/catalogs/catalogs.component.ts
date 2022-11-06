import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import {  ApiMovies, ApiSeries, TranslationLanguage } from 'src/interfaces/interface';
import { MovieService } from 'src/services/movie.service';
import { SeriesService } from 'src/services/series.service';
import { getLanguageFile } from '../utils/languages/langues';
import { DEFAULT_CARD_IMG, getRatingFormat, TYPES, CATALOGS_FILTERS_KEYS} from 'src/app//utils/utils';
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
export class CatalogsComponent{

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
      title: "",
      type: TYPES.movie,
      filters: {
        popularity: (page:number=1, genreId:number=0) => this.movieService.getPopularMovies("desc", page, genreId),
        note: ( page:number=1, genreId:number=0) => this.movieService.getRatedMovies("desc", page, genreId),
        dateCreatdAt: (page:number=1, genreId:number=0) => this.movieService.getLatestMovies("desc", page, genreId),
      }
    },
    series:{
      isSelected: false,
      title: "",
      type: TYPES.serie,
      filters: {
        popularity: (page:number=1, genreId:number=0) =>  this.seriesService.getPopularSeries("desc", page, genreId),
        note: (page:number=1, genreId:number=0) =>  this.seriesService.getRatedSeries("desc", page, genreId),
        dateCreatdAt: (page:number=1, genreId:number=0) => this.seriesService.getLatestSeries("desc", page, genreId),
      }
    }
  }
  title=""
  type=""
  filterOn:string = CATALOGS_FILTERS_KEYS.popularity as string
  currentPage:number = 1;
  totalPages:number = 1;
  genre:GenreI | undefined;
  isGenre=false;
  defaultCardImage = DEFAULT_CARD_IMG;
  getRatingFormat= getRatingFormat; 
  translation: TranslationLanguage | null = null;
  CATALOGS_FILTERS_KEYS = CATALOGS_FILTERS_KEYS;

  constructor(
    private route: ActivatedRoute,private router: Router,
    private movieService:MovieService, private seriesService:SeriesService) { 
      this.translation = getLanguageFile();
      this.router.events.pipe(
        filter((event:any) => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        this.currentRoute = event.url;  
        this.options = {
          ...this.options,
          movies: {
            ...this.options.movies,
            title: getLanguageFile().global.movies,
            isSelected: event.url.split("/").includes(TYPES.movies),
          },
          series: {
            ...this.options.series,
            title: getLanguageFile().global.series,
            isSelected: event.url.split("/").includes(TYPES.series),
          }
        }
        Object.entries(this.options).find(([_, value]) => {
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
    const arr = [
      {optionsRef: this.options.movies},
      {optionsRef: this.options.series}
    ]
    arr.forEach(el => {
      if(el.optionsRef.isSelected && el.optionsRef.filters[this.filterOn as keyof typeof el.optionsRef.filters]){
        el.optionsRef.filters[this.filterOn as keyof typeof el.optionsRef.filters](page,genreId).subscribe((data) => {
          if(el.optionsRef.type === TYPES.movie){
            this.movies = data;
          } 
          if (el.optionsRef.type === TYPES.serie){
            //If type === TYPES.serie then data = ApiSeries
            //@ts-ignore
            this.series = data;
          }
          this.currentPage = data.page;
          // tested on the api -> receive error over pagination 500
          this.totalPages = data.total_pages > 500 ? 500 : data.total_pages - 1;
        });
      }
    })
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
     if(this.genre && this.genre.id){
      this.fetchData({page, genreId: this.genre.id});
    }else {
      this.fetchData({page});
    }
    return page;
  }
}

