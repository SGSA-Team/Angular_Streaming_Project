import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-links-list',
  templateUrl: './links-list.component.html',
  styleUrls: ['./links-list.component.scss']
})
export class LinksListComponent implements OnInit {

  @Input() hoverOnMovies:boolean= false;
  @Input() hoverOnSeries:boolean= false;
  @Output() hoverOnMoviesChange = new EventEmitter<boolean>();
  @Output() hoverOnSeriesChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

   onHoverCategory(type:string, hover:boolean):void {
    switch(type){
      case "movies": {
        this.hoverOnMovies = hover
        this.hoverOnMoviesChange.emit(this.hoverOnMovies);
        break;
      }
      case "series": {
        this.hoverOnSeries= hover
        this.hoverOnSeriesChange.emit(this.hoverOnSeries);
        break;
      }
      default: {
        this.hoverOnMovies = hover
        break;
      }
    }
  }


}
