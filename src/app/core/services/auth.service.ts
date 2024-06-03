import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuth, IAuthLogin } from '../../common/interfaces/service.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createUser(email: string, password: string, role: string): Observable<IAuth> {
    const body = { email: email, password: password, role: role };

    return this.http.post(`${this.apiUrl}/users`, body).pipe(
      map((response: any) => {
        return {
          message: response.message,
        };
      })
    );
  }

  //TODO: Validate with token
  login(email: string, password: string): Observable<IAuthLogin> {
    const body = { email: email, password: password };

    return this.http.post(`${this.apiUrl}/users/login`, body).pipe(
      map((response: any) => {
        return {
          message: response.message,
          user: response.user,
        };
      })
    );
  }
}
