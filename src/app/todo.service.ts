import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { ToDo } from './todo';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private toDoUrl = 'api/toDoList';  // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  /** GET To Do List from the server */
  getToDoList(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.toDoUrl).pipe(
      tap(toDoList => this.log('Fetched To Do List')),
      catchError(this.handleError('getToDoList', []))
    );
  }

  getToDoItem(id: number): Observable<ToDo> {
    const url = `${this.toDoUrl}/${id}`;
    return this.http.get<ToDo>(url).pipe(
      tap(_ => this.log(`fetched To Do Item id=${id}`))
    );
  }

  /** PUT: update the new to do item on the server */
  updateToDoItem(toDo: ToDo): Observable<any> {
    return this.http.put(this.toDoUrl, toDo, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated To Do Item id=${toDo.id}`)),
        catchError(this.handleError<any>('updateToDoItem'))
      );
  }

  addToDoItem(toDo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.toDoUrl, toDo, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Added To Do id=${toDo.id}`)),
        catchError(this.handleError<any>('addToDoItem'))
      );
  }

  deleteToDoItem(toDo: ToDo): Observable<ToDo> {
    const id = typeof toDo === 'number' ? toDo : toDo.id;
    const url = `${this.toDoUrl}/${id}`;
    return this.http.delete<ToDo>(url, this.httpOptions)
  }

  searchToDoItems(term: string): Observable<ToDo[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<ToDo[]>(`${this.toDoUrl}/?task=${term}`)
      .pipe(
        tap(_ => this.log(`Found To Do Items matching "${term}`)),
        catchError(this.handleError<ToDo[]>('searchToDoItems', []))
      );
  }

  /** Log a ToDoService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ToDoService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
