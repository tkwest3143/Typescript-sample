import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  private url = 'http://127.0.0.1:3000';
  constructor(private http: HttpClient) {
     }
     getUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.url}/users`)
        .pipe(
          catchError(this.handleError('getUsers', []))
        );
    }
  
    getUser(id: number): Observable<User> {
      console.log(`${this.url}/users/${id}`);
      return this.http.get<User>(`${this.url}/users/${id}`)
        .pipe(
          catchError(this.handleError<User>(`getUser id=${id}`))
        );
    }
  
    setUser(user: User): Observable<User> {
      const id = user.id;
      return this.http.post<User>(`${this.url}/users/${id}`, user)
        .pipe(
          catchError(this.handleError<User>(`setUser id=${id}`))
        );
    }
  
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
  }
