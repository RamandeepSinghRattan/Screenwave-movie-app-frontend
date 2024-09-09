import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSingleMovieComponent } from './show-single-movie.component';

describe('ShowSingleMovieComponent', () => {
  let component: ShowSingleMovieComponent;
  let fixture: ComponentFixture<ShowSingleMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowSingleMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowSingleMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
