import { Component, inject } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar, CalendarOptions, EventInputTransformer, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
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
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin],
    initialEvents: {
      url: 'http://localhost:8080/scheduler/get',
    },
    headerToolbar: {
      left: 'prev,next',
    center: 'title',
    right: 'timeGridDay,timeGridWeek,dayGridMonth'
    },
    eventDataTransform: this.transformEventData,
  };
}
