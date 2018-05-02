import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaEliminarComponent } from './tarea-eliminar.component';

describe('TareaEliminarComponent', () => {
  let component: TareaEliminarComponent;
  let fixture: ComponentFixture<TareaEliminarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareaEliminarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
