import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { HomeComponent } from './home/home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogs', children: [
      {
        path: 'movies', // child route path
        component: CatalogsComponent, // child route component that the router renders
      },
      {
        path: 'series',
        component: CatalogsComponent, // another child route component that the router renders
      },
    ], redirectTo: ''},
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
