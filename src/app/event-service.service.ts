import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventData } from './event-data';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': [
      'application/json',
    ],
  }),
};

@Injectable()
export class EventServiceService {
  eventsUrl = 'http://localhost:8080/event'; // URL to web api


  constructor(private http: HttpClient) {
    
  }

  getAllEvents(): Observable<EventData[]> {
    return this.http.get<EventData[]>(this.eventsUrl+"/all");
    // return this.http.get<EventData[]>(this.eventsUrl);
  }

  addEvent(event: EventData){
    console.log('Adding event')
    const body = JSON.stringify({
      title: 'TEST NET 35',
      description: 'Virker det',
      startTime: '2024-05-12T10:00:00',
      endTime: '2024-05-12T11:00:00',
      repeatStartDate: null,
      repeatEndDate: null,
      duration: null,
      userId: '1',
      repeatDays: null,
      flexible: null,
      repeating: null,
    });

console.log(body);

    const data = this.http.post(
      this.eventsUrl + '/add',
      body,
      httpOptions
    );
    console.log(data);
    return data.subscribe();
  }
}