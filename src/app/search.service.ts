import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface FilmList {
  Search: {
    Title : string;
    imdbID : string;
    Poster : string;
  }[];
  Response: "True" | "False";
}

export interface FilmInfo {
    Title : string;
    Year : string;
    Runtime : string;
    Genre: string;
    Director : string;
    Actors : string;
    Plot : string;
    Poster : string;
}

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  readonly url = 'http://www.omdbapi.com/';
  readonly apikey = '5d1286f';

  constructor(private http: HttpClient) { }

  searchItems(value: string) {
    return this.http.get<FilmList>(`${this.url}?apikey=${this.apikey}&s=${value}`)
    .pipe(map((data: FilmList) => (data['Response'] === 'True') ? data['Search'] : []));
  }

  getDescription(id: string) {
    return this.http.get<FilmInfo>(`${this.url}?apikey=${this.apikey}&i=${id}&plot=full`);
  }
}
