import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemResponse } from '../interface/item-info';
import { listOfBrands } from '../interface/list-of-brands';
import { listOfItems } from '../interface/page-request';

@Injectable({
  providedIn: 'root',
})
export class ProductInfoService {
  constructor(private http: HttpClient) {}
  getListOfItems(
    searchTerms: string,
    brand: string,
    pageSize: number,
    page: number
  ) {
    let alteredBrand = brand.replace(/ /g, '-');
    let alteredSearchTerms = searchTerms.replace(/ /g, '+');
    return this.http.get<listOfItems>(
      `https://us.openfoodfacts.org/cgi/search.pl?action=process&search_terms=${alteredSearchTerms}&tagtype_0=brands&tag_contains_0=contains&tag_0=${alteredBrand}&page_size=${pageSize}&page=${page}&json=true`
    );
  }
  getListOfTop50Brands() {
    return this.http.get<listOfBrands>(
      'https://us.openfoodfacts.org/brands.json'
    );
  }
  getItemInfo(id: number) {
    return this.http.get<ItemResponse>(
      `https://world.openfoodfacts.org/api/v0/product/${id}.json`
    );
  }
}
