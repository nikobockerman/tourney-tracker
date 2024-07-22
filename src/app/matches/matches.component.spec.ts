import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesComponent } from './matches.component';

describe('MatchesComponent', () => {
  let component: MatchesComponent | null = null;
  let fixture: ComponentFixture<MatchesComponent> | null = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
