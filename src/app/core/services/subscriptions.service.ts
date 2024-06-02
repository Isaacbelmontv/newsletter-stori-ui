import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createSubscription(email: string, newsletters: number): Observable<any> {
    const body = {
      email,
      newsletters,
    };

    console.log(body);
    return this.http.post(`${this.apiUrl}/subscribe`, body);
  }
}
