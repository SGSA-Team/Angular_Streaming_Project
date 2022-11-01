import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  language = localStorage.getItem('lang') || environment.defaultLanguage;
  propUsername: string = '';
  constructor() {}

  changeLanguage(language: Lang) {
    console.log(language);
    localStorage.setItem('lang', language);
  }
  ngOnInit(): void {}
}

type Lang = 'es-ES' | 'en-US' | 'fr-FR';
