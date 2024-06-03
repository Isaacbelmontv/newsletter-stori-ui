import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { INewsletterData } from '../../common/interfaces/service.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewslettersService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getNewsletters(): Observable<INewsletterData[]> {
    return this.http.get<INewsletterData[]>(`${this.apiUrl}/newsletters`).pipe(
      map((response: any) =>
        response.map((item: INewsletterData) => {
          return {
            id: item.id,
            title: item.title,
            content: item.content,
            assetfile: item.assetfile,
            assetname: item.assetname,
            assettype: item.assettype,
          } as INewsletterData;
        })
      )
    );
  }

  postNewsletter(data: INewsletterData) {
    const formData: FormData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    // TODO send user id from storage
    formData.append('user', '1');
    if (data?.assetFile) formData.append('assetFile', data?.assetFile);
    return this.http.post(`${this.apiUrl}/newsletters`, formData).pipe(
      map((response: any) => {
        return {
          message: response.message,
        };
      })
    );
  }

  sendNewsletter(data: {
    user: number;
    subscribers: number[];
    newsletter: number;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-newsletter`, data);
  }
}
