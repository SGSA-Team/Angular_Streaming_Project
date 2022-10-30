import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-links-list',
  templateUrl: './links-list.component.html',
  styleUrls: ['./links-list.component.scss']
})
export class LinksListComponent implements OnInit {

  @Input() clickOnMovies:boolean= false;
  @Input() clickOnSeries:boolean= false;
  @Output() clickOnMoviesChange = new EventEmitter<boolean>();
  @Output() clickOnSeriesChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
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
