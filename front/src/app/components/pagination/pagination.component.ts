import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { getLanguageFile } from 'src/app/utils/languages/langues';
import { TranslationLanguage } from 'src/interfaces/interface';
interface PageI{
  event?: Event; 
  number?: number; 
}
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number = 1;
  @Input() totalPages: number = 10 ;
  @Output() currentPageChange = new EventEmitter<number>();
  @Output() totalPagesChange = new EventEmitter<number>();
  @Output("pageChange") pageChange: EventEmitter<number> = new EventEmitter<number>();
  translation: TranslationLanguage | null = null;

  constructor() {
    this.translation = getLanguageFile();
   }

  ngOnInit(): void {
  }

  inputChange({event, number}:PageI){
    if(event){
      const element = event.target as HTMLInputElement
      if(element.value){
        const value = parseInt(element.value);
        if(value === 0){
          this.currentPage = 1;
        }else {
          this.pageChange.emit(value);
        }
      }
    }else if(number){
      this.pageChange.emit(number);
    }
  }
}
