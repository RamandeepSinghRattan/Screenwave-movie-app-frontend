import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbOperationService } from '../service/tmdb-operation.service';
import { DatabaseOperationService } from '../service/database-operation.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-single-movie',
  templateUrl: './show-single-movie.component.html',
  styleUrl: './show-single-movie.component.css'
})
export class ShowSingleMovieComponent {

  constructor(private http: TmdbOperationService, private ac: ActivatedRoute, private dbOperation: DatabaseOperationService, private snackBar: MatSnackBar, private router: Router) { }

  movie: any = {};
  genreNames: string[] = [];
  isFavorited = false;
  actors: any[] = [];

  ngOnInit() {
    this.ac.paramMap.subscribe({
      next: (id) => {
        let movieId = id.get("movieId") ?? 0;
        // console.log(movieId);

        this.http.getSingleMovie(+movieId).subscribe((data) => {
          this.movie = data;
          this.genreNames = this.movie.genres.map((genre: any) => genre.name);

          if (this.movie.credits && Array.isArray(this.movie.credits.cast)) {
            this.actors = this.movie.credits.cast
              .filter((actor: any) => actor.known_for_department === "Acting" && actor.profile_path)
              .map((actor: any) => ({
                name: actor.name,
                image: actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '',
                role: actor.character
              }));
          }


          this.checkIfFavorited();
        })
      },
      error: (error) => {
        console.log("Error occured " + error);
      }

    })

    window.scrollTo(0, 0);
  }

  getFormattedRating(rating: number): number {
    return Math.floor(rating * 10) / 10;
  }

  checkIfFavorited() {
    this.dbOperation.getFavMovies().subscribe({
      next: (favorites) => {
        this.isFavorited = favorites.some(favMovie => favMovie.id === this.movie.id);
      },
      error: (err) => {
        console.log("Error in getting fav Movies " + err);
      }
    });
  }

  addToFav() {

    this.dbOperation.saveMovieToFavList(this.movie).subscribe(
      {
        next: (data) => {
          this.snackBar.open("Movie Added", 'Close', { duration: 3000 });
          this.checkIfFavorited(); // Refresh the favorite status
        },
        error: (err) => {
          if (err.status === 409) {
            this.snackBar.open("Movie is already in your favourite list", 'Close', { duration: 4000 });

          }
          else {
            this.snackBar.open("Please Login To Add movie", 'Close', { duration: 4000 });
          }
        }
      }
    )
  }

  navigateTo(movieid: number) {
    this.router.navigate([`playMovie/${movieid}`]);
    // console.log(movieid);

  }

  heartIconClicked() {
    this.dbOperation.deleteFavMovie(this.movie.id).subscribe(data => {
      this.snackBar.open("Movie removed from favourite list", 'Close', { duration: 3000 });
      this.isFavorited = false;
      this.checkIfFavorited();
    })
  }
}
