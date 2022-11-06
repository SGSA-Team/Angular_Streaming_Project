import { Component, OnInit } from '@angular/core';
import {getAppLanguage, getLanguageFile, setAppLanguage, setDefaultLanguage} from 'src/app/utils/languages/langues';
import { TranslationLanguage } from 'src/interfaces/interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  translation: TranslationLanguage | null = null;
  defaultLanguage: string | null = null
  constructor() {
    this.translation = getLanguageFile();
    this.defaultLanguage = getAppLanguage()
    console.log(getLanguageFile())
  }

  ngOnInit(): void {
    setDefaultLanguage()
  }

  updateLanguage(event: Event){
    console.log("event",event);
    setAppLanguage(event);
    this.translation = getLanguageFile();
    window.location.reload();
  }
}
