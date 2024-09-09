import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play-movie',
  templateUrl: './play-movie.component.html',
  styleUrl: './play-movie.component.css'
})
export class PlayMovieComponent {
  movieId?: number; 
  apiKey = '2e609edae6ff58db8e8060d582808305';
  trailerUrl?: SafeResourceUrl;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private ac: ActivatedRoute) { }



  ngOnInit() {

    this.ac.paramMap.subscribe(id => {
      let idRecievied = id.get("movieid") ?? 0;
      this.movieId = +idRecievied;
      this.getTrailer(this.movieId);
    })

  }

  getTrailer(movieId: number) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${this.apiKey}`;

    this.http.get(url).subscribe((response: any) => {
      const trailer = response.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        const youtubeUrl = `https://www.youtube.com/embed/${trailer.key}`;
        this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
      }
    });
  }
}
