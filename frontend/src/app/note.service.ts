import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from './models/note.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private url = '/api';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addNote (note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.url}/notes`, note, this.httpOptions).pipe(
      tap((newNote: Note) => console.log(`added note w/ id=${newNote._id}`)),
      catchError(this.handleError<Note>('addNote'))
    );
  }

  getNotes (): Observable<Note[]> {
  	return this.http.get<Note[]>(`${this.url}/notes`)
  	  .pipe(
  	  	  tap(_ => console.log('lista obtida')),
          catchError(this.handleError<Note[]>('getNotes', [])),
  	  	)
  }

  updateNote (note: Note): Observable<any> {
    return this.http.put(`${this.url}/notes/${note._id}`, note, this.httpOptions).pipe(
      tap(_ => console.log(`updated Note id=${note._id}`)),
      catchError(this.handleError<any>('updateNote'))
    );
  }

  deleteNote (_id: string): Observable<Note> {
    return this.http.delete<Note>(`${this.url}/notes/${_id}`, this.httpOptions).pipe(
      tap(_ => console.log(`deleted Note id=${_id}`)),
      catchError(this.handleError<Note>('deleteNote'))
    );
  }

  // acessível a outros métodos desta classe
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }
}
