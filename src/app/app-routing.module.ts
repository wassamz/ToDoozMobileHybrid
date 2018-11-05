import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoListComponent } from './todo-list/todo-list.component';
import { ToDoDetailComponent } from './todo-detail/todo-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'todolist', component: ToDoListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ToDoDetailComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
