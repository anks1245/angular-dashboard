import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuByIdComponent } from './menu-by-id.component';

describe('MenuByIdComponent', () => {
  let component: MenuByIdComponent;
  let fixture: ComponentFixture<MenuByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
