import { Component, ElementRef, HostListener } from '@angular/core';
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons"
import { getLanguageFile } from 'src/app/utils/languages/langues';
import { TranslationLanguage } from 'src/interfaces/interface';
import { MovieService } from 'src/services/movie.service';
import { SeriesService } from 'src/services/series.service';
import { DEFAULT_CARD_IMG, getCardImageBg, TYPES } from "src/app/utils/utils";

interface Result{
  id: number;
  title: string;
  img: string;
  type:string;
  displayedType:string|undefined;
}

@Component({
  selector: 'app-global-search-bar',
  templateUrl: './global-search-bar.component.html',
  styleUrls: ['./global-search-bar.component.scss']
})
export class GlobalSearchBarComponent {
  searchIcon = faMagnifyingGlass;
  deleteIcon = faXmark;
  clickedOnSearch = false;
  focusOnSearch = false;
  value=""
  data : Result[] =[]
  moviesFilter=false;
  seriesFilter=false;
  displayedData : Result[] =[]
  defaultCardImage = DEFAULT_CARD_IMG;
  loadingData = false;
  TYPES = TYPES;
  getCardImageBg=getCardImageBg;
  translation: TranslationLanguage | null = null;

  constructor(private eRef: ElementRef, private movieService:MovieService, private seriesService:SeriesService) { 
    this.translation = getLanguageFile();
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
          displayedType: this.translation?.global.movie,
          type: this.TYPES.movie
        })
        this.displayedData.push({
          id: el.id,
          title: el.title,
          img: el.poster_path,
          displayedType: this.translation?.global.movie,
          type: this.TYPES.movie
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
          displayedType: this.translation?.global.serie,
          type: this.TYPES.serie
        })
        this.displayedData.push({
          id: el.id,
          title: el.name,
          img: el.backdrop_path,
          displayedType: this.translation?.global.serie,
          type: this.TYPES.serie
        })
        this.loadingData = false; 
      })
      }
    })
  }

  filterResults(filter:string){
    switch(filter){
      case this.TYPES.movie: {
        this.seriesFilter = false;
        if(this.moviesFilter){
          this.displayedData = this.data
        }else {
          this.displayedData = this.data.filter(el => el.type === "movie")
        }
        this.moviesFilter = !this.moviesFilter;
        break;
      }
      case this.TYPES.serie: {
        this.moviesFilter = false;
        if(this.seriesFilter){
          this.displayedData = this.data
        }else {
          this.displayedData = this.data.filter(el => el.type === "serie")
        }
        this.seriesFilter = !this.seriesFilter;
        break;
      }
      default: {
        console.error("error while applying filter ! Unknow filter !")
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

  clickOnCard(){
    this.value= ""
    this.data = [];
    this.displayedData = [];
    this.focusOnSearch = false;
  }

  resetValue(){
    this.value= ""
  }

  @HostListener('document:click', ['$event'])
  clickout(event:Event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.focusOnSearch = false;
    }
  }
}
