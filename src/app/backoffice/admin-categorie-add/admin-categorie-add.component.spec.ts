import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategorieAddComponent } from './admin-categorie-add.component';

describe('AdminCategorieAddComponent', () => {
  let component: AdminCategorieAddComponent;
  let fixture: ComponentFixture<AdminCategorieAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategorieAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategorieAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
