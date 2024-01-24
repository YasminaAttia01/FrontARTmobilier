import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategorieEditComponent } from './admin-categorie-edit.component';

describe('AdminCategorieEditComponent', () => {
  let component: AdminCategorieEditComponent;
  let fixture: ComponentFixture<AdminCategorieEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategorieEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategorieEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
