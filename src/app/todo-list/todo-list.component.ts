import { Component, OnInit } from '@angular/core';
import { ToDo } from '../todo';
import { ToDoService } from '../todo.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class ToDoListComponent implements OnInit {

  toDoList: ToDo[];

  constructor(private toDoService: ToDoService) { }

  ngOnInit() {
    this.getToDoList();
  }
  getToDoList(): void {
    this.toDoService.getToDoList().subscribe(toDoList => this.toDoList = toDoList);
  }

  add(task: string): void {
    task = task.trim();
    if (!task) { return; }

    this.toDoService.addToDoItem({ task } as ToDo)
      .subscribe(toDo => {
        this.toDoList.push(toDo);
      });
  }

  delete(toDo: ToDo): void {
    this.toDoList = this.toDoList.filter(td => td !== toDo);
    this.toDoService.deleteToDoItem(toDo)
      .subscribe();
  }
}
