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

  addHero (hero: Note): Observable<Note> {
    return this.http.post<Note>(this.url, hero, this.httpOptions).pipe(
      tap((newNote: Note) => console.log(`added hero w/ id=${newNote.__id}`)),
      catchError(this.handleError<Note>('addHero'))
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
    return this.http.put(this.url, Note, this.httpOptions).pipe(
      tap(_ => console.log(`updated Note id=${note.__id}`)),
      catchError(this.handleError<any>('updateNote'))
    );
  }

  deleteHero (note: Note | number): Observable<Note> {
    const id = typeof note === 'number' ? note : note.__id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Note>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted Note id=${id}`)),
      catchError(this.handleError<Note>('deleteHero'))
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
