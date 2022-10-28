// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  baseUrl: 'https://api.themoviedb.org/3',
  apiImageUrl: 'https://image.tmdb.org/t/p/original', // original c'est le format et tu passe les jpg
  apiKey: 'd0cf98f3003cd0b22e77f20efd3b7edb',
  production: false,
  defaultLanguage: 'fr-FR',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
