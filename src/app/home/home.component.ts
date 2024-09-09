import { Component } from '@angular/core';
import { TmdbOperationService } from '../service/tmdb-operation.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private http: TmdbOperationService) { }

  movieData: any =[];

  ngOnInit() {

    this.http.getPopularMovies().subscribe({
      next: (data) => {
        this.movieData = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
    
  }
  

}
