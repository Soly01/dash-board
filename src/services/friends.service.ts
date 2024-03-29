import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(private http: HttpClient) {}
  getFriends(): Observable<any> {
    return this.http.get('../assets/friends.json', { observe: 'response' });
  }
}
