import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getLanguageFile } from 'src/app/utils/languages/langues';
import { ApiMovie, ApiSerie, TranslationLanguage } from 'src/interfaces/interface';
import { DEFAULT_CARD_IMG, getCardImageBg, getRatingFormat, openInfo } from "src/app/utils/utils";

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss']
})
export class CustomCardComponent{
  @Input() img: string=""
  defaultCardImage: string= DEFAULT_CARD_IMG;
  @Input() type: string =""
  @Input()
  element!: ApiMovie | ApiSerie;
  @Input() displayeType: string=""
  @Input() title: string=""
  @Input() release_date: string =""
  getCardImageBg = getCardImageBg;
  dialog: MatDialog;
  openInfo = openInfo;
  getRatingFormat = getRatingFormat;
  translation: TranslationLanguage | null = null;

  constructor(private dialogRef: MatDialog) {
      this.dialog = dialogRef;
      this.translation = getLanguageFile();
   }

}
