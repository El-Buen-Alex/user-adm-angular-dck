import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackLoadingComponent } from './snack-loading.component';

describe('SnackLoadingComponent', () => {
  let component: SnackLoadingComponent;
  let fixture: ComponentFixture<SnackLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
