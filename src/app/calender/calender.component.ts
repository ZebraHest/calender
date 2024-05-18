import { Component, inject } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar, CalendarOptions, EventInputTransformer, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventData } from '../event-data';
import { EventServiceService } from '../event-service.service';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css',
})
export class CalenderComponent {
  events: EventSourceInput[] = [];
  eventService: EventServiceService = inject(EventServiceService);

  transformEventData: EventInputTransformer = (eventInput) => {
    return {
      title: eventInput.title?.toUpperCase(),
      start: eventInput['startTime'],
      end: eventInput['endTime'],
    };
  };

  calenderOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    initialEvents: {
      url: 'http://localhost:8080/event/all',
    },
    eventDataTransform: this.transformEventData,
  };
}
