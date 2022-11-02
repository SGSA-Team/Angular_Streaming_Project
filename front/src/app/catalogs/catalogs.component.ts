import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ApiMovies, ApiSeries } from 'src/interfaces/interface';
import { MovieService } from 'src/services/movie.service';
import { SeriesService } from 'src/services/series.service';

interface CatalogsFilters {
    dateCreatdAt: boolean,
    popularity:boolean,
    note: boolean,
}

interface GenreI {
  id: number;
  name: string | null;
}

interface PageI{
  page: number; 
  value: string; 
  isActive: boolean; 
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
      filters: {
        popularity: (page:number=1, genreId:number=0) => this.movieService.getPopularMovies("desc", page, genreId),
        note: ( page:number=1, genreId:number=0) => this.movieService.getRatedMovies("desc", page, genreId),
        dateCreatdAt: (page:number=1, genreId:number=0) => this.movieService.getLatestMovies("desc", page, genreId),
      }
    },
    series:{
      isSelected: false,
      title: "Series",
      filters: {
        popularity: (page:number=1) =>  this.seriesService.getPopularSeries("desc", page),
        note: (page:number=1) =>  this.seriesService.getRatedSeries("desc", page),
        dateCreatdAt: (page:number=1) => this.seriesService.getLatestSeries("desc", page),
      }
    }
  }
  title=""
  filterOn:string = "popularity" as string
  maxPages= 10;
  pages:PageI[]=[];
  genre:GenreI | undefined;
  isGenre=false;

  constructor(  private route: ActivatedRoute,private router: Router,private movieService:MovieService, private seriesService:SeriesService) { 
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
    this.pages = [];
    if(this.options.movies.isSelected && this.options.movies.filters[this.filterOn as keyof typeof this.options.movies.filters]){
    this.options.movies.filters[this.filterOn as keyof typeof this.options.movies.filters](page,genreId).subscribe((data) => {
      this.movies = data;
       this.pages.push({
          page: 1,
          value: "1",
          isActive: data.page === 1
      })
      for(let i = 1; i <= this.maxPages; i++){
        if(i !==1){
          this.pages.push({
            page: i,
            value: i === this.maxPages - 1 ? "..." : i.toString(),
            isActive: i === data.page
          })
        }
      }

      console.log("this.pages: ",this.pages)
      //page
      //total_pages
    });
    }else if(this.options.series.isSelected && this.options.series.filters[this.filterOn as keyof typeof this.options.series.filters]){
    this.options.series.filters[this.filterOn as keyof typeof this.options.series.filters](page).subscribe((data) => {
      console.log("series data: ",data)
      this.series = data;
      this.pages.push({
          page: 1,
          value: "1",
          isActive: data.page === 1
      })
      for(let i = 1; i <= this.maxPages; i++){
        if(i !==1){
          this.pages.push({
            page: i,
            value: i === this.maxPages - 1 ? "..." : i.toString(),
            isActive: i === data.page
          })
        }
      }
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

  async pageClick(page:number){
    console.log(page)
     if(this.genre && this.genre.id){
      this.fetchData({page, genreId: this.genre.id});
    }else {
      this.fetchData({page});
    }
  }
}
