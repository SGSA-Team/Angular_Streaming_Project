import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ApiMovies, ApiSeries } from 'src/interfaces/interface';
import { MovieService } from 'src/services/movie.service';
import { SeriesService } from 'src/services/series.service';

interface CatalogsFilters {
    dateCreatdAt: boolean,
    popularity:boolean,
    note: boolean,
}

interface PageI{
  page: number; 
  value: string; 
  isActive: boolean; 
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
        popularity: (page:number=1) => this.movieService.getPopularMovies("desc", page),
        note: ( page:number=1) => this.movieService.getRatedMovies("desc", page),
        dateCreatdAt: (page:number=1) => this.movieService.getLatestMovies("desc", page),
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

  constructor(private router: Router,private movieService:MovieService, private seriesService:SeriesService) { 
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
        })
  }

  async fetchData(page:number=1){
    this.pages = [];
    if(this.options.movies.isSelected && this.options.movies.filters[this.filterOn as keyof typeof this.options.movies.filters]){
    this.options.movies.filters[this.filterOn as keyof typeof this.options.movies.filters](page).subscribe((data) => {
      console.log("movies data: ",data)
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
    this.fetchData();
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
    this.fetchData();
  }

  async pageClick(page:number){
    console.log(page)
    this.fetchData(page);
  }
}
