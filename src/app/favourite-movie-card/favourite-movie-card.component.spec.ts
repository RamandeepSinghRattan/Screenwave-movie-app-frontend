import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteMovieCardComponent } from './favourite-movie-card.component';

describe('FavouriteMovieCardComponent', () => {
  let component: FavouriteMovieCardComponent;
  let fixture: ComponentFixture<FavouriteMovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavouriteMovieCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavouriteMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
