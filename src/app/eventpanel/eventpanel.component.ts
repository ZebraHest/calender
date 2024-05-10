import { Component, Input, inject } from '@angular/core';
import { EventData } from '../event-data';
import { EventServiceService } from '../event-service.service';
import { EventSourceInput } from '@fullcalendar/core';

@Component({
  selector: 'app-eventpanel',
  standalone: true,
  imports: [],
  templateUrl: './eventpanel.component.html',
  styleUrl: './eventpanel.component.css',
})
export class EventpanelComponent {
  filteredEvents: EventSourceInput[] = [];
  events: EventSourceInput[] = [];
  eventService: EventServiceService = inject(EventServiceService);

  constructor() {
    this.eventService.getAllEvents().then((list: EventSourceInput[]) => {
      console.log(list);
      this.events = list;
      this.filteredEvents = this.events;
    });
  }

  filterResults(text: string) {
    if (!text) this.filteredEvents = this.events;

    // this.filteredEvents = this.events.filter(
    // //   (e) =>
    // //     e.title?.toLowerCase().includes(text.toLowerCase()) ||
    // //     e.description?.toLowerCase().includes(text.toLowerCase())
    // );
  }

  mouseOverEvent() {
    console.log('Over Event');
  }
}
