import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoSearchComponent } from './todo-search.component';

describe('ToDoSearchComponent', () => {
  let component: ToDoSearchComponent;
  let fixture: ComponentFixture<ToDoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToDoSearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
