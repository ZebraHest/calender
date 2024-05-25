import { Component, inject, TemplateRef } from '@angular/core';
import { EventData } from '../event-data';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { EventServiceService } from '../event-service.service';
import { SharedCloseService } from '../shared-close.service';


@Component({
  selector: 'app-modal2',
  standalone: true,
  imports: [NgbDatepickerModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  private modalService = inject(NgbModal);
  activeModal = inject(NgbActiveModal);
  eventService: EventServiceService = inject(EventServiceService);

  errors = [];

  constructor(private closeService: SharedCloseService){};

  saveandclose(t: any[]) {
    let eventData: EventData = {
      id: 0,
      title: t.at(0),
      description: t.at(1),
      startTime: t.at(2),
      endTime: t.at(3),
      isFlexible: t.at(4),
      duration: this.transformDuration(t.at(5), t.at(6), t.at(7)),
      isRepeating: t.at(8),
      startDateRepeating: t.at(9),
      endDateRepeating: t.at(10),
      repeatDays: this.transformRepeatDays(t.at(11)),
      userId: '',
    };
    const returndata = this.eventService.addEvent(eventData).subscribe({

      error: (error) => {
        console.log('oops', error), (this.errors = error.error.errors);
      }
      ,
      complete: () => {
        this.activeModal.close();
        this.closeService.sendCloseEvent();
      },
    });


    
  }

  transformRepeatDays(days: boolean[]): string[] {
    const values: string[] = [];
    if (days.at(0)) {
      values.push('MONDAY');
    }
    if (days.at(1)) {
      values.push('TUESDAY');
    }
    if (days.at(2)) {
      values.push('WEDNESDAY');
    }
    if (days.at(3)) {
      values.push('THURSDAY');
    }
    if (days.at(4)) {
      values.push('FRIDAY');
    }
    if (days.at(5)) {
      values.push('SATURDAY');
    }
    if (days.at(6)) {
      values.push('SUNDAY');
    }
    return values;
  }

  transformDuration(days: number, hours: number, minutes: number): number {
    hours = hours + days * 24;
    minutes = minutes + hours * 60;
    return minutes * 60;
  }
}
