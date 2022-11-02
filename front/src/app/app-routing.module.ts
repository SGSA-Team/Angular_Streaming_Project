import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { HomeComponent } from './home/home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogs/movies', pathMatch: 'full',component: CatalogsComponent },
  { path: 'catalogs/movies/:id', pathMatch: 'full',component: CatalogsComponent },
  { path: 'catalogs/series', pathMatch: 'full',component: CatalogsComponent },
  { path: 'catalogs/series/:id', pathMatch: 'full',component: CatalogsComponent },
  { path: '**', redirectTo: '', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
