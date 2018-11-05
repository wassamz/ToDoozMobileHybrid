import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ToDoService } from '../todo.service';
import { ToDo } from '../todo';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class ToDoDetailComponent implements OnInit {
  @Input() toDo: ToDo;

  constructor(
    private route: ActivatedRoute,
    private toDoService: ToDoService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getToDoItem();
  }

  getToDoItem(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.toDoService.getToDoItem(id)
      .subscribe(toDo => this.toDo = toDo);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.toDoService.updateToDoItem(this.toDo)
      .subscribe(() => this.goBack());
  }

}
