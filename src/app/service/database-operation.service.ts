import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseOperationService {

  private apiUrl = 'http://localhost:8080/api/v1/';

  private userMovie = 'http://localhost:8080/api/v2/';

  constructor(private http: HttpClient) { }

  generateToken(data: any): Observable<any> {

    return this.http.post<any>(this.apiUrl + 'login', data);
  }

  login(token: any) {
    localStorage.setItem('token', token); // api+token
    return true;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): Observable<any> {
    return this.http.get<any>(this.userMovie + "favMovie/getUser");
  }

  saveMovieToFavList(obj: any) {

    return this.http.post(this.userMovie + "favMovie/movie", obj);
  }

  getFavMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.userMovie}/favMovie/movies`);
  }
  
  deleteFavMovie(movieId: number) {
    return this.http.delete(this.userMovie + "/favMovie/movie/" + movieId);
  }


}
