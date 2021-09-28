import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TitleMetaService {
  constructor(private titleService: Title, private metaService: Meta, private router: Router) {}

  setTitle(title: string) {
    this.titleService.setTitle(`${title} | OlympicBooks`);
  }

  updateTitleAndMetaTags(title: string, description: string, imgUrl: string) {
    // Primary Meta Tags
    this.titleService.setTitle(`${title} | OlympicBooks`);
    this.metaService.updateTag({ name: 'description', content: description });

    // Open Graph / Facebook
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:url', content: `${environment.storeUrl}${this.router.url}` });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: imgUrl });

    // Twitter
    this.metaService.updateTag({ name: 'twitter:card', content: 'product' });
    this.metaService.updateTag({ name: 'twitter:url', content: `${environment.storeUrl}${this.router.url}` });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: imgUrl });
  }
}
