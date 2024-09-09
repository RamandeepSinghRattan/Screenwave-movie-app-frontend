import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input()
  movie:any;

  fallbackImageUrl:string = "https://png.pngtree.com/background/20211217/original/pngtree-movie-film-white-light-effect-simple-black-background-picture-image_1576159.jpg";

  getImageUrl(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return posterPath ? baseUrl + posterPath : this.fallbackImageUrl;
  }

  getFormattedRating(rating: number): number {
    return Math.floor(rating *10)/10;
  }

}
