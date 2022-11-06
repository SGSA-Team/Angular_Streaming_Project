import {USER_LANG} from "src/app/utils/utils"
import english from "./english.json";
import french from "./french.json";
import spanish from "./spanish.json";

interface Map {
  [key: string]: any
}

//Create logic to track update on lclStrg from footer selector 
const TRANSLATED_FILES: Map=  {
    "fr-FR": french,
    "en-EN": english,
    "en-Us": english,
    "es-ES": spanish
};

export const setDefaultLanguage = () => {
    const browserLang  = navigator.language; 
    const userLang  = localStorage.getItem(USER_LANG)
    if(!userLang){
        localStorage.setItem(USER_LANG, browserLang)
    }
}

export const setAppLanguage = (language: string | any) => {
    localStorage.setItem(USER_LANG, language)
}
export const getAppLanguage = () => {
    return localStorage.getItem(USER_LANG)
}

export const getLanguageFile = () => {
    const userLang  = localStorage.getItem(USER_LANG)
    const navigatorLang  = navigator.language; 

    if(userLang){
        return TRANSLATED_FILES[userLang]
    }else {
        return TRANSLATED_FILES[navigatorLang]
    }
}
