import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  language = localStorage.getItem('lang') || environment.defaultLanguage;
  constructor(private router: Router, private route: ActivatedRoute) {}

  changeLanguage(language: Lang) {
    console.log(language);
    localStorage.setItem('lang', language);
    this.reload();
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }
  ngOnInit(): void {}
}

type Lang = 'es-ES' | 'en-US' | 'fr-FR';
