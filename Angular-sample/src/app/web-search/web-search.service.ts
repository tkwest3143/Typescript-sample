import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { User } from '../model/user';
import application from '../../../application.json';
import { SearchResult } from '../model/searchResult';

@Injectable({
  providedIn: 'root',
})
export class WebSearchService {
  constructor(private http: HttpClient) {}
  getSearchResult(siteId: number): Observable<SearchResult[]> {
    return this.http
      .get<SearchResult[]>(
        `${application.config['api-server-host']}/web-search/${siteId}`
      )
      .pipe(catchError(this.handleError(`web-search site id = ${siteId}`, [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
