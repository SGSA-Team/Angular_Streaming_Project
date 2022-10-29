import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './home/home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CommonModule } from '@angular/common';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { NavbarComponent } from './layout/header/components/navbar/navbar.component';
import { LinksListComponent } from './layout/header/components/navbar/components/links-list/links-list.component';
import { GlobalSearchBarComponent } from './layout/header/components/navbar/components/global-search-bar/global-search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PagenotfoundComponent,
    CatalogsComponent,
    NavbarComponent,
    LinksListComponent,
    GlobalSearchBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
