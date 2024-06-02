import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  INewsletterSubscription,
  ISubscription,
} from '../../common/interfaces/service.interface';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createSubscription(
    email: string,
    newsletters: number
  ): Observable<ISubscription> {
    const body = {
      email,
      newsletters,
    };

    return this.http.post(`${this.apiUrl}/subscribe`, body).pipe(
      map((response: any) => {
        return {
          message: response.message,
        };
      })
    );
  }

  getSubscriptions(email: string): Observable<INewsletterSubscription[]> {
    return this.http.get<any>(`${this.apiUrl}/subscribe/${email}`).pipe(
      map((response: any) =>
        response.map((item: INewsletterSubscription) => {
          return {
            id: item.id,
            email: item.email,
            active: item.active,
            newsletters: {
              id: item.newsletters.id,
              title: item.newsletters.title,
              content: item.newsletters.content,
            },
          } as INewsletterSubscription;
        })
      )
    );
  }

  updateSubscription(id: number, active: boolean): Observable<ISubscription> {
    const url = `${this.apiUrl}/subscribe/${id}`;
    const body = { active: active };

    return this.http.put(url, body).pipe(
      map((response: any) => {
        return {
          message: response.message,
        };
      })
    );
  }
}
