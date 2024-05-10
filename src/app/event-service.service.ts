import { Injectable } from '@angular/core';
import { EventData } from './event-data';
import { EventSourceInput } from '@fullcalendar/core';

@Injectable({
  providedIn: 'root',
})
export class EventServiceService {
  url = 'http://localhost:8080/event';

  constructor() {}

  async getAllEvents(): Promise<EventData[]> {
    const data = await fetch(this.url.concat('/all'));
    return (await data.json()) ?? [];
  }

  async getEventById(id: number): Promise<EventData[]> {
    console.log('${this.url}/${id}');
    const data = await fetch(this.url.concat('?id=').concat(String(id)));

    return (await data.json()) ?? [];
  }
}
