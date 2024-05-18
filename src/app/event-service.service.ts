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
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      repeatStartDate: event.startDateRepeating,
      repeatEndDate: event.endDateRepeating,
      duration: event.duration,
      userId: event.userId,
      repeatDays: event.repeatDays,
      isFlexible: event.isFlexible,
      isRepeating: event.isRepeating,
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