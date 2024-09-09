import { Component } from '@angular/core';
import { DatabaseOperationService } from '../service/database-operation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favourite-movies',
  templateUrl: './favourite-movies.component.html',
  styleUrl: './favourite-movies.component.css'
})
export class FavouriteMoviesComponent {
  favMovies?: any;


  constructor(private dbOperation: DatabaseOperationService, private snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.dbOperation.getFavMovies().subscribe({
      next: data => {
        console.log(data);
        this.favMovies = data;

      },
      error: (err) => {
        alert("No Fovourite movies")
      }
    })
  }

  handleMovieRemoved(movieId: number) {
    this.dbOperation.deleteFavMovie(movieId).subscribe({
      next: (data) => {

        this.snackBar.open('Movie Removed from favourite list', 'Close', { duration: 2000 });
        this.favMovies = this.favMovies.filter((movie: any) => movie.id !== movieId);
      },
      error: err => {
        alert("movie is not found");
      }
    });
  }
}
