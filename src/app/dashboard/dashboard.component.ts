import { Component, OnInit } from '@angular/core';
import { ToDo } from '../todo';
import { ToDoService } from '../todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  toDoList: ToDo[] = [];

  constructor(private toDoService: ToDoService) { }

  ngOnInit() {
    this.getToDoList();
  }

  getToDoList(): void {
    this.toDoService.getToDoList()
      .subscribe(toDoList => this.toDoList = toDoList.slice(0, 3));
  }
}