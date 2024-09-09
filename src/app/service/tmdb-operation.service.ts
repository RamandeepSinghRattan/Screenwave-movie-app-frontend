import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbOperationService {

  constructor(private http: HttpClient) { }

  
  popularMovieUrl:string = "https://api.themoviedb.org/3/movie/popular?api_key=2e609edae6ff58db8e8060d582808305&language=en-US&page=1";
  topRatedMovieUrl:string = "https://api.themoviedb.org/3/movie/top_rated?api_key=2e609edae6ff58db8e8060d582808305&language=en-US&page=1";
  upcomingMovieUrl:string = "https://api.themoviedb.org/3/movie/upcoming?api_key=2e609edae6ff58db8e8060d582808305&language=en-US&page=1";
  nowPlayingMovieUrl:string = "https://api.themoviedb.org/3/movie/now_playing?api_key=2e609edae6ff58db8e8060d582808305&language=en-US&page=1";


  getPopularMovies(){
      return this.http.get(this.popularMovieUrl);
  }

  getTopRatedMovies(){
      return this.http.get(this.topRatedMovieUrl);
  }

  getUpcomingMovies(){
      return this.http.get(this.upcomingMovieUrl);
  }

  getNowPlayingMovies(){
      return this.http.get(this.nowPlayingMovieUrl);
  }

  getSingleMovie(id:Number){
      return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=2e609edae6ff58db8e8060d582808305&append_to_response=credits`)
  }


  searchMovies(query: string): Observable<any> {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=2e609edae6ff58db8e8060d582808305&query=${query}`;
    return this.http.get<any>(url);
  }
}
