import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private http: HttpClient) {}
  getTable(): Observable<any> {
    return this.http.get('../assets/table.json', { observe: 'response' });
  }
}
