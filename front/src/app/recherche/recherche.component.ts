import { Component, OnInit } from '@angular/core';
import { RechercheService } from 'src/services/recherche.service';


@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {

  rechercheStr: string = ""

  constructor(private recherche:RechercheService){}

  ngOnInit(): void {
  }

  search(input: any){
    this.recherche.getSearch(input).subscribe(data=>{
      console.warn(data)
    })
  }

}
