import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ApiMovies, ApiSeries } from 'src/interfaces/interface';
import { MovieService } from 'src/services/movie.service';
import { SeriesService } from 'src/services/series.service';

interface CatalogsFilters {
    dateCreatdAt: boolean,
    createdAt:boolean,
    title: boolean,
    note: boolean,
}
@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent implements OnInit {

  filterSelected:CatalogsFilters={
    dateCreatdAt: true,
    createdAt:false,
    title:false,
    note: false,
  };

  movies: Partial<ApiMovies> = {};
  series: Partial<ApiSeries> = {};
  currentRoute:string=""
  options = {
    movies :{
      isSelected: false,
      title: "Films"
    },
    series:{
      isSelected: false,
      title: "Series"
    }
  }
  title=""

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

  async ngOnInit(): Promise<void> {
    if(this.options.movies.isSelected){
      this.movieService.getLatestMovies("desc").subscribe((data) => {
        console.log("movies data: ",data)
        this.movies = data;
      });
    }else if(this.options.series.isSelected){
       this.seriesService.getLatestSeries("desc").subscribe((result) => {
        console.log("series data: ", result)
        this.series = result;
      });
    }
  }

  updateFilter(filter:string){
    const newFiltersOptions =  Object
    .keys(this.filterSelected) 
    .reduce((result, k) =>{
      return { ...result, [k] : filter === k}
    }, {
    dateCreatdAt: false,
    createdAt:false,
    title:false,
    note: false
  })
    console.log(newFiltersOptions)
    this.filterSelected=newFiltersOptions; 
  }
}
