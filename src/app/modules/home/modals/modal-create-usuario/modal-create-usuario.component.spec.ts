import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateUsuarioComponent } from './modal-create-usuario.component';

describe('ModalCreateUsuarioComponent', () => {
  let component: ModalCreateUsuarioComponent;
  let fixture: ComponentFixture<ModalCreateUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCreateUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
