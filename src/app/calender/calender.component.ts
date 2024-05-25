import { Component, ViewChild, inject } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar, CalendarOptions, EventInputTransformer, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventData } from '../event-data';
import { EventServiceService } from '../event-service.service';
import { Subscription , timer} from 'rxjs';
import { SharedCloseService } from '../shared-close.service';
import { FullCalendarComponent } from '@fullcalendar/angular';

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
  @ViewChild('calender') calendarComponent!: FullCalendarComponent;

  clickEventsubscription: Subscription;

  constructor(private sharedService: SharedCloseService) {
    this.clickEventsubscription = this.sharedService
      .getCloseEvent()
      .subscribe(() => {
        this.updateCalenderWithDelay();
      });
  }

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
    events: {
      url: 'http://localhost:8080/scheduler/get',
    },
    customButtons: {
      updateButton: {
        text: 'update',
        click: () => this.updateCalender(),
      },
    },
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'updateButton timeGridDay,timeGridWeek,dayGridMonth',
    },
    eventDataTransform: this.transformEventData,
  };

  updateCalenderWithDelay() {
    console.log('update calender');
    timer(1000).subscribe((x) => {
      this.updateCalender();
    });
  }

  updateCalender() {
    console.log('update calender');
    this.calendarComponent.getApi().refetchEvents();
  }
}
