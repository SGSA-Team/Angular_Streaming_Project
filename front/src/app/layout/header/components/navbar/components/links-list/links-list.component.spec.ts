import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksListComponent } from './links-list.component';

describe('LinksListComponent', () => {
  let component: LinksListComponent;
  let fixture: ComponentFixture<LinksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinksListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
