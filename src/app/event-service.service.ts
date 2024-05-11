import { Injectable } from '@angular/core';
import { EventData } from './event-data';

@Injectable({
  providedIn: 'root',
})

export class EventServiceService {
  url = 'http://localhost:8080/event';

  constructor() {}

  async getAllEvents(): Promise<EventData[]> {
    const data = await fetch(this.url.concat('/all'));
    const da = await data.json();
    console.log(da);
    return (da) ?? [];
  }

  async getEventById(id: number): Promise<EventData[]> {
    console.log('${this.url}/${id}');
    const data = await fetch(this.url.concat('?id=').concat(String(id)));

    return (await data.json()) ?? [];
  }

  // async saveEvent(event: EventData){
  //   this.http.post<EventData>();
  // }
}


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { EventData } from './event-data';
// import { Observable } from 'rxjs';


// @Injectable()
// export class EventServiceService {
//   heroesUrl = 'http://localhost:8080/event/all'; // URL to web api


//   constructor(private http: HttpClient) {
    
//   }

//   getAllEvents(): Observable<EventData[]> {
//     return this.http.get<EventData[]>(this.heroesUrl);
//   }

  // addHero(hero: EventData): Observable<EventData> {
  //   return this.http.post<EventData>(this.heroesUrl, hero, httpOptions);
  // }
// }