import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Chat } from '../model/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chats: Chat[] = [];
  postChat: Chat = new Chat();
  private url = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) {
  }
  getChats(roomId: string): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.url}/chats/${roomId}`)
      .pipe(
        catchError(this.handleError('getChats', []))
      );
  }

  postChats(chat: Chat): Observable<Chat[]> {
    return this.http.post<Chat[]>(`${this.url}/chats/post`, chat)
      .pipe(
        catchError(this.handleError('postChats', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
