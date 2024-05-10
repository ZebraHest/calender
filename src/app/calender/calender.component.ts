import { Component, inject } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventData } from '../event-data';
import { EventServiceService } from '../event-service.service';

// document.addEventListener('DOMContentLoaded', function () {
//   let calendarEl: HTMLElement = document.getElementById('calendar')!;

//   let calendar = new Calendar(calendarEl, {
//     plugins: [dayGridPlugin],
//     // options here
//   });

//   calendar.render();
// });

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css',
})
export class CalenderComponent {
  events: EventData[] = [];
  eventService: EventServiceService = inject(EventServiceService);

  // constructor() {
  //   var calendarEl = document.getElementById('calendar');
  //   var calendar = new FullCalendar.Calendar(calendarEl, {
  //     plugins: [dayGridPlugin],
  //     // options here
  //   });
  // }

  calenderOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    initialEvents: [{
      id: 'createEventId()',
      title: 'Timed event',
      start: '20240512T12:00:00',
    }],
  };
}
