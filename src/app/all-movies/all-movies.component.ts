import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TmdbOperationService } from '../service/tmdb-operation.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrl: './all-movies.component.css'
})
export class AllMoviesComponent {
  constructor(private http: TmdbOperationService) { }

  topRatedMovies: any = [];
  nowPlayingMovies: any = [];
  upcomingMovies: any = [];
  popularMovies: any = [];

  search: string = '';
  searchResults?: any;
  showResults: boolean = false;


  ngOnInit() {

    forkJoin({
      popularMovies: this.http.getPopularMovies(),
      topRatedMovies: this.http.getTopRatedMovies(),
      upcomingMovies: this.http.getUpcomingMovies(),
      nowPlayingMovies: this.http.getNowPlayingMovies()

    }).subscribe({
      next: (data) => {
        this.popularMovies = data.popularMovies;
        this.topRatedMovies = data.topRatedMovies;
        this.upcomingMovies = data.upcomingMovies;
        this.nowPlayingMovies = data.nowPlayingMovies;
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

   searched() {
    if (this.search.trim()) {
      this.http.searchMovies(this.search).subscribe({
        next: (response) => {
          this.searchResults = response.results;
          this.showResults = this.searchResults.length > 0;
        },
        error: (error) => {
          console.error('Error: ', error);
          this.searchResults = [];
          this.showResults = false;
        }
      });
    } else {
      this.searchResults = [];
      this.showResults = false;
    }
  }

}

