import { Component } from '@angular/core';
import { RechercheService } from 'src/services/recherche.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';
  
  constructor(private recherche:RechercheService){

    this.recherche.getData().subscribe(data=>{
      console.warn(data)
    })

  }


}


