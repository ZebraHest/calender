import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventData } from './data/event-data';
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
    const body = JSON.stringify({
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      repeatStartDate: event.startDateRepeating,
      repeatEndDate: event.endDateRepeating,
      duration: event.duration,
      userId: "1",
      repeatDays: event.repeatDays,
      isFlexible: event.isFlexible,
      isRepeating: event.isRepeating,
    });

    const data = this.http.post(
      this.eventsUrl + '/add',
      body,
      httpOptions
    );
    console.log(data);
    return data;
  }
}