import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteUsuarioComponent } from './modal-delete-usuario.component';

describe('ModalDeleteUsuarioComponent', () => {
  let component: ModalDeleteUsuarioComponent;
  let fixture: ComponentFixture<ModalDeleteUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDeleteUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeleteUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
