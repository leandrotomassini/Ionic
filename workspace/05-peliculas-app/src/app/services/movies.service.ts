import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RespuestaMDB } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getFeature() {
    return this.http.get<RespuestaMDB>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2015-09-15&primary_release_date.lte=2022-03-22&api_key=2da25bb3a599df3ffc31e1b1b0d3af25&languaje=es&include_image_languaje=es`);
  }
}
