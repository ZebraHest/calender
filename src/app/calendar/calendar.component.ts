import { Component, ViewChild, inject } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  Calendar,
  CalendarOptions,
  EventInputTransformer,
  EventSourceInput,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventData } from '../data/event-data';
import { Subscription, timer } from 'rxjs';
import { SharedCloseService } from '../shared-close.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  events: EventSourceInput[] = [];
  axiosService: AxiosService = inject(AxiosService);
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  clickEventsubscription: Subscription;

  constructor(private sharedService: SharedCloseService) {
    this.clickEventsubscription = this.sharedService
      .getCloseEvent()
      .subscribe(() => {
        this.updateCalendarWithDelay();
      });
  }

  transformEventData: EventInputTransformer = (eventInput) => {
    return {
      title: eventInput.title?.toUpperCase(),
      start: eventInput['startTime'],
      end: eventInput['endTime'],
    };
  };

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    firstDay: 1,
    plugins: [dayGridPlugin, timeGridPlugin],
    events: {
      url: 'http://localhost:8080/scheduler/get',
    },
    customButtons: {
      updateButton: {
        text: 'update',
        click: () => this.updateCalendar(),
      },
    },
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'updateButton timeGridDay,timeGridWeek,dayGridMonth',
    },

    businessHours: [
      {
        daysOfWeek: [1, 2, 3, 4],
        startTime: '08:00',
        endTime: '18:00',
        backgroundColor: '#000000',
      },
      {
        daysOfWeek: [5],
        startTime: '08:00',
        endTime: '16:00',
      },
    ],
    eventDataTransform: this.transformEventData,
  };

  updateCalendarWithDelay() {
    console.log('update calendar');
    timer(1000).subscribe((x) => {
      this.updateCalendar();
    });
  }

  updateCalendar() {
    console.log('update calendar');
    this.calendarComponent.getApi().refetchEvents();
  }
}
