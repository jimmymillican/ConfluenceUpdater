import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfluenceService {
  public apiBaseUrl = '/wiki/api/v2';
  private authHeader = `Basic ${btoa('${WIKI_API_UNAME}:${WIKI_API_KEY}')}`; // REPLACE CREDENTIALS //

  constructor(private http: HttpClient) {}

  fetchPages(limit: number = 10, cursor: string = ''): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.authHeader,
      Accept: 'application/json',
    });

    // Use the correct endpoint (/spaces) and add query parameters
   /* return this.http.get<any>(`${this.apiBaseUrl}/spaces`, { 
      headers,
      params: {
        //'ids': '911179782,3087007785',
        'limit': '200',  // Adjust as needed
        'body-format': 'none',
        'excerpt': 'none'
      }
    });*/

//https://**URL**/wiki/api/v2/spaces?limit=250&sort=-key for getting the spaceid in postman
// FieldID SpaceID - '3087007783' , Crisis - '2635760028' mango = '3307536754', EP=  '2972287394' , IEX = '3088121876'
    const  params: any ={
      'space-id': '3310092301', 
      'limit': '30',//limit.toString(),
      'body-format': 'storage',
      'get-draft': 'false',
     

    }

    if (cursor) {
      params.cursor = cursor;
    }

    console.log('cursor' + cursor.toString());
    console.log('limit' + limit.toString());


    return this.http.get<any>(`${this.apiBaseUrl}/pages`, { 
      headers,
      params
    });
  
  }

  updatePageTitle(
    pageId: string,
    title: string,
    versionNumber: number,
    body: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.authHeader,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    const bodyData = {
      id: pageId,
      status: 'current',
      title,
      body: {
        representation: 'storage',
        value: body,
      },
      version: {
        number: versionNumber + 1,
        message: 'Title updated via bulk tool',
      },
    };

    return this.http.put(`${this.apiBaseUrl}/pages/${pageId}`, bodyData, { headers });
  }
}