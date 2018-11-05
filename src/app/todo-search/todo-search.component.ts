import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { ToDo } from '../todo';
import { ToDoService } from '../todo.service';


@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.css']
})
export class ToDoSearchComponent implements OnInit {
  toDoList$: Observable<ToDo[]>;
  private searchTerms = new Subject<string>();

  constructor(private toDoService: ToDoService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit() {
    this.toDoList$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) =>
        this.toDoService.searchToDoItems(term)),
    );
  }

}
