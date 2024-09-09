import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowSingleMovieComponent } from './show-single-movie/show-single-movie.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { FavouriteMoviesComponent } from './favourite-movies/favourite-movies.component';
import { PlayMovieComponent } from './play-movie/play-movie.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "movie/:movieId",
    component: ShowSingleMovieComponent
  },
  {
    path: "aboutus",
    component: AboutUsComponent
  },
  {
    path: "movies",
    component: AllMoviesComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path:"favourites",
    component: FavouriteMoviesComponent
  },
  {
    path:"playMovie/:movieid",
    component: PlayMovieComponent
  },
  {
    path:"register",
    component: RegisterComponent
  },
  {
    path:"user/profile",
    component: UserProfileComponent
  },
  {
    path:"**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
