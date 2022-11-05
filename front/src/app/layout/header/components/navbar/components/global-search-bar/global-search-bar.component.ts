import { Component, OnInit } from '@angular/core';
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons"
import { MovieService } from 'src/services/movie.service';
import { SeriesService } from 'src/services/series.service';


interface Result{
  id: number;
  title: string;
  img: string;
  type:string;
}

@Component({
  selector: 'app-global-search-bar',
  templateUrl: './global-search-bar.component.html',
  styleUrls: ['./global-search-bar.component.scss']
})
export class GlobalSearchBarComponent implements OnInit {
  searchIcon = faMagnifyingGlass;
  deleteIcon = faXmark;
  clickedOnSearch = false;
  focusOnSearch = false;
  value=""
  data : Result[] =[]
  moviesFilter=false;
  seriesFilter=false;
  displayedData : Result[] =[]
  defaultCardImage = 'https://mergejil.mn/mergejilmn/no-image.jpeg'
  loadingData = false;

  constructor(private movieService:MovieService, private seriesService:SeriesService) { }

  ngOnInit(): void {
  }

  toggleSearchFocus() {
    this.focusOnSearch = !this.focusOnSearch;
  }
  async searchData (){
    this.loadingData = true; 
    this.data = [];
    this.displayedData = [];
    this.movieService.getMoviesBySearchQuery(this.value).subscribe((data)=> {
      if(data && data.results && data.results.length > 0){
        data.results.forEach(el => {
        this.data.push({
          id: el.id,
          title: el.title,
          img: el.poster_path,
          type: "Film"
        })
        this.displayedData.push({
          id: el.id,
          title: el.title,
          img: el.poster_path,
          type: "Film"
        })
        this.loadingData = false; 
      })
      }
    })
    this.seriesService.getSeriesBySearchQuery(this.value).subscribe((data)=> {
      if(data && data.results && data.results.length > 0){
        data.results.forEach(el => {
        this.data.push({
          id: el.id,
          title: el.name,
          img: el.backdrop_path,
          type: "Série"
        })
        this.displayedData.push({
          id: el.id,
          title: el.name,
          img: el.backdrop_path,
          type: "Série"
        })
        this.loadingData = false; 
      })
      }
    })
  }

  getCardImageBg(path: string){
    return 'https://image.tmdb.org/t/p/original/'+path;
  }

  filterResults(filter:string){
    switch(filter){
      case "movies": {
        this.seriesFilter = false;
        if(this.moviesFilter){
          this.displayedData = this.data
        }else {
          this.displayedData = this.data.filter(el => el.type === "Film")
        }
        this.moviesFilter = !this.moviesFilter;
        break;
      }
      case "series": {
        this.moviesFilter = false;
        if(this.seriesFilter){
          this.displayedData = this.data
        }else {
          this.displayedData = this.data.filter(el => el.type === "Série")
        }
        this.seriesFilter = !this.seriesFilter;
        break;
      }
      default: {
        //
        break;
      }
    }
  }

  trackInputChange(){
    if(this.value === ""){
      this.data = [];
      this.displayedData = [];
    }
  }

  resetValue(){
    this.value= ""
  }

}
