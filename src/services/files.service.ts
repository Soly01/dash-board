import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}
  getFiles(): Observable<any> {
    return this.http.get('../assets/files.json', { observe: 'response' });
  }
}
