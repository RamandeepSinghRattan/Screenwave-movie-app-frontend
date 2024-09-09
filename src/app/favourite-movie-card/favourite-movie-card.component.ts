import { Component, Input } from '@angular/core';
import { DatabaseOperationService } from '../service/database-operation.service';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-favourite-movie-card',
  templateUrl: './favourite-movie-card.component.html',
  styleUrl: './favourite-movie-card.component.css'
})
export class FavouriteMovieCardComponent {
  @Input()
  movie: any;

  @Output()
  movieRemoved = new EventEmitter<number>();

  constructor(private dbOperation: DatabaseOperationService) { }

  getFormattedRating(rating: number): number {
    return Math.floor(rating * 10) / 10;
  }


  removeMovie(event: Event) {
    event.preventDefault();  
    event.stopPropagation();     

    console.log(this.movie.id);
    this.movieRemoved.emit(this.movie.id);

  }
}
