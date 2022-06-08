import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeholderPipe',
})
export class PlaceholderPipePipe implements PipeTransform {
  constructor(private http: HttpClient) {}

  transform(keywords: string[]) {
    this.http
      .get<any>(
        'https://api.unsplash.com/search/photos?page=1&query=peanut+butter&client_id=69uQ42XtmxOpRiaGwsVUdo9QKSkTkJ0C_poIeAMdTlM'
      )
      .subscribe((res: any) => {
        console.log(res.results[0].urls.full);
        return res.results[0].urls.full;
      });
  }
}
