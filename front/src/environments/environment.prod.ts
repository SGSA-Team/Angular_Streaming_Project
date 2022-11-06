interface EnvironmentI {
  baseUrl: string;
  apiImageUrl: string; 
  apiKey: string;
  production: boolean;
  defaultLanguage: string;
}

export const environment:EnvironmentI = {
  baseUrl: 'https://api.themoviedb.org/3',
  apiImageUrl: 'https://image.tmdb.org/t/p/original', // original c'est le format et tu passe les jpg
  apiKey: 'd0cf98f3003cd0b22e77f20efd3b7edb',
  production: false,
  defaultLanguage: 'fr-FR',
};
