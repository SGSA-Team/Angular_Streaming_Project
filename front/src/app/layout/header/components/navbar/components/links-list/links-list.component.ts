import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getLanguageFile } from 'src/app/utils/languages/langues';
import { TranslationLanguage } from 'src/interfaces/interface';
@Component({
  selector: 'app-links-list',
  templateUrl: './links-list.component.html',
  styleUrls: ['./links-list.component.scss']
})
export class LinksListComponent {

  @Input() clickOnMovies:boolean= false;
  @Input() clickOnSeries:boolean= false;
  @Output() clickOnMoviesChange = new EventEmitter<boolean>();
  @Output() clickOnSeriesChange = new EventEmitter<boolean>();
  translation: TranslationLanguage | null = null;

  constructor() {
      this.translation = getLanguageFile();
  }

  onClickCategory(type:string):void {
    switch(type){
      case "movies": {
        this.clickOnMovies = !this.clickOnMovies;
        this.clickOnMoviesChange.emit(this.clickOnMovies);
        this.clickOnSeries = false;
        this.clickOnSeriesChange.emit(this.clickOnSeries);
        break;
      }
      case "series": {
        this.clickOnSeries = !this.clickOnSeries;
        this.clickOnSeriesChange.emit(this.clickOnSeries);
        this.clickOnMovies = false;
        this.clickOnMoviesChange.emit(this.clickOnMovies);
        break;
      }
      case "close": {
        this.clickOnSeries = false;
        this.clickOnSeriesChange.emit(this.clickOnSeries);
        this.clickOnMovies = false;
        this.clickOnMoviesChange.emit(this.clickOnMovies);
        break;
      }
      default: {
        this.clickOnSeries = false;
        this.clickOnSeriesChange.emit(this.clickOnSeries);
        this.clickOnMovies = false;
        this.clickOnMoviesChange.emit(this.clickOnMovies);
        break;
      }
    }
  }
}
