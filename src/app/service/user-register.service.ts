import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor(private http: HttpClient) { }
  
  private registerUrl = 'http://localhost:8080/api/v2/register';

  register(user: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }
}
