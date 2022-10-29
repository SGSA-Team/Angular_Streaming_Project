import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSearchBarComponent } from './global-search-bar.component';

describe('GlobalSearchBarComponent', () => {
  let component: GlobalSearchBarComponent;
  let fixture: ComponentFixture<GlobalSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalSearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
