import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  listOfTop50Brands: {}[] = [];
  constructor(private http: HttpClient) {}
  getPlaceholderImage() {
    return this.http.get<any>(
      'https://api.unsplash.com/search/photos?page=1&query=peanut+butter&client_id=69uQ42XtmxOpRiaGwsVUdo9QKSkTkJ0C_poIeAMdTlM'
    );
  }
}
