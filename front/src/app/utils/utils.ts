export const USER_LANG = 'userLang'
import { MatDialog } from "@angular/material/dialog";
import { ApiMovie, ApiSerie } from "src/interfaces/interface";
import { ModalComponent } from "../components/modal/modal.component";

export const TMDB_IMG_SRC_PATH:string = 'https://image.tmdb.org/t/p/original/';
export const DEFAULT_CARD_IMG = 'https://mergejil.mn/mergejilmn/no-image.jpeg'
export const TYPES = {
  movie: "movie",
  serie: "serie"
}
export const DIALOGS_SIZES ={
  minWidth: '50vw',
  maxWidth: '50vw',
  minHeight: '75vh',
  maxHeight: '75vh',
}


export class DateHelper {
  static diffDateToNow(date: Date): string {
    return Math.abs((date.getTime() - Date.now()) / 31536000000).toFixed(0);
  }
}

export const getCardImageBg = (path: string) => {
    return `${TMDB_IMG_SRC_PATH}${path}`;
}


export const openInfo = (dialogRef:MatDialog, element: ApiMovie | ApiSerie, type:string) => {
    dialogRef.open(ModalComponent, {
      ...DIALOGS_SIZES,
      data: {
        data: element,
        type: type,
        link: `/detail/${type}/${element.id}`
      }
    });
};

export const getRatingFormat = (rating: number) => {
  return Math.round(rating)
}