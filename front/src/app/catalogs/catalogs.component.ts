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
        popularity: this.movieService.getPopularMovies("desc"),
        note:this.movieService.getRatedMovies("desc"),
        dateCreatdAt:this.movieService.getLatestMovies("desc"),
      }
    },
    series:{
      isSelected: false,
      title: "Series",
      filters: {
        popularity: this.seriesService.getPopularSeries("desc"),
        note:this.seriesService.getRatedSeries("desc"),
        dateCreatdAt:this.seriesService.getLatestSeries("desc"),
      }
    }
  }
  title=""
  filterOn:string = "popularity" as string

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

  async fetchData(){
    console.log("filterOn",this.filterOn)

    if(this.options.movies.isSelected && this.options.movies.filters[this.filterOn as keyof typeof this.options.movies.filters]){
    this.options.movies.filters[this.filterOn as keyof typeof this.options.movies.filters].subscribe((data) => {
      console.log("movies data: ",data)
      this.movies = data;
    });
    }else if(this.options.series.isSelected && this.options.series.filters[this.filterOn as keyof typeof this.options.series.filters]){
    this.options.series.filters[this.filterOn as keyof typeof this.options.series.filters].subscribe((data) => {
      console.log("series data: ",data)
      this.series = data;
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
}
