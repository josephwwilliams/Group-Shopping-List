import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { listOfItems } from '../page-request';

@Injectable({
  providedIn: 'root',
})
export class ProductInfoService {
  constructor(private http: HttpClient) {}
  getListOfItems(searchTerms: string, pageSize: number, page: number) {
    let alteredSearchTerms = searchTerms.replace(/ /g, '+');
    return this.http.get<listOfItems>(
      `https://us.openfoodfacts.org/cgi/search.pl?action=process&search_terms=${alteredSearchTerms}&page_size=${pageSize}&page=${page}&json=true`
    );
  }
}
