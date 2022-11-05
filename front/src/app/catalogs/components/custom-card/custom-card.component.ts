import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiMovie, ApiSerie } from 'src/interfaces/interface';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss']
})
export class CustomCardComponent{

  @Input() img: string=""
  defaultCardImage: string='https://mergejil.mn/mergejilmn/no-image.jpeg'
  @Input() type: string =""
  @Input() element: ApiMovie | ApiSerie | null = null;
  @Input() displayeType: string=""
  @Input() title: string=""
  @Input() release_date: string =""


  constructor(private dialog: MatDialog) { }

  getRatingFormat(rating: number){
    return Math.round(rating)
  }

  openInfo = (movie: ApiMovie | ApiSerie, type:string) => {
    this.dialog.open(ModalComponent, {
      minWidth: '50vw',
      maxWidth: '50vw',
      minHeight: '75vh',
      maxHeight: '75vh',
      data: {
        data: movie,
        type: type
      }
    });
  };

  getCardImageBg(path: string){
    return 'https://image.tmdb.org/t/p/original/'+path;
  }
}
