import {
  afterNextRender,
  Component,
  Inject,
  inject,
  TemplateRef,
} from '@angular/core';
import { EventData } from '../data/event-data';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedCloseService } from '../shared-close.service';
import { AxiosService } from '../axios.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AxiosResponse } from 'axios';

@Component({
  selector: 'app-modal2',
  standalone: true,
  imports: [ReactiveFormsModule, NgbDatepickerModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  private modalService = inject(NgbModal);
  activeModal = inject(NgbActiveModal);

  axiosService: AxiosService = inject(AxiosService);

  editEvent: EventData | undefined;

  title = new FormControl('');
  description = new FormControl('');
  startTime = new FormControl('');
  endTime = new FormControl('');
  isFlexible = new FormControl(false);
  durationDays = new FormControl<number>(0);
  durationHours = new FormControl(0);
  durationMinutes = new FormControl(0);
  isRepeating = new FormControl(false);
  startDateRepeating = new FormControl('');
  endDateRepeating = new FormControl('');
  repeatMonday = new FormControl(false);
  repeatTuesday = new FormControl(false);
  repeatWednesday = new FormControl(false);
  repeatThursday = new FormControl(false);
  repeatFriday = new FormControl(false);
  repeatSaturday = new FormControl(false);
  repeatSunday = new FormControl(false);
  userId = new FormControl('');
  id: number | undefined;

  errors = [];

  constructor(private closeService: SharedCloseService) {
    afterNextRender(() => {
      console.log(this.editEvent);
      if (this.editEvent != null) {
        this.title.setValue(this.editEvent.title);
        this.description.setValue(this.editEvent.description);
        this.startTime.setValue(
          this.transformDatetimeForFrontend(this.editEvent.startTime)
        );
        this.endTime.setValue(
          this.transformDatetimeForFrontend(this.editEvent.endTime)
        );
        this.isFlexible.setValue(this.editEvent.flexible);
        this.transformDurationForFrontEnd(this.editEvent.duration);
        this.isRepeating.setValue(this.editEvent.repeating);
        this.startDateRepeating.setValue(this.editEvent.repeatStartDate);
        this.endDateRepeating.setValue(this.editEvent.repeatEndDate);
        this.transformRepeatDaysForFrontend(this.editEvent.repeatDays);
        this.userId.setValue(this.editEvent.userId);
        this.id = this.editEvent.id;
      }
    });
  }

  saveandclose() {
    this.axiosService
      .request('POST', '/event/add', this.requestBody())
      .catch((e) => {
        console.log(e);
        this.errors = e.response.data.errors;
        return e;
      })
      .then((response) => {
        if (response.status == '200'){
          this.activeModal.close();
          this.closeService.sendCloseEvent();
        }   
      });
  }

  updateandclose() {
    this.axiosService
      .request('PUT', '/event/update', this.requestBody())
      .catch((e) => {
        console.log(e);
      })
      .then((response) => {
        this.activeModal.close();
        this.closeService.sendCloseEvent();
      });
  }

  deleteandclose() {
    this.axiosService
      .request('DELETE', '/event/delete?id='+this.editEvent?.id, {})
      .catch((e) => {
        console.log(e);
      })
      .then((response) => {
        this.activeModal.close();
        this.closeService.sendCloseEvent();
      });
  }

  private requestBody(): any {
    return {
      title: this.title.value,
      description: this.description.value,
      startTime: this.transformDatetime(this.startTime.value),
      endTime: this.transformDatetime(this.endTime.value),
      repeatStartDate: this.transformDatetime(this.startDateRepeating.value),
      repeatEndDate: this.transformDatetime(this.endDateRepeating.value),
      duration: this.transformDuration(),
      userId: '1',
      repeatDays: this.transformRepeatDays(),
      isFlexible: this.isFlexible.value,
      isRepeating: this.isRepeating.value,
      id: this.id,
    };
  }

  transformRepeatDays(): string[] {
    const values: string[] = [];
    if (this.repeatMonday.value) {
      values.push('MONDAY');
    }
    if (this.repeatTuesday.value) {
      values.push('TUESDAY');
    }
    if (this.repeatWednesday.value) {
      values.push('WEDNESDAY');
    }
    if (this.repeatThursday.value) {
      values.push('THURSDAY');
    }
    if (this.repeatFriday.value) {
      values.push('FRIDAY');
    }
    if (this.repeatSaturday.value) {
      values.push('SATURDAY');
    }
    if (this.repeatSunday.value) {
      values.push('SUNDAY');
    }
    return values;
  }

  // transformDuration(days: number, hours: number, minutes: number): number {
  transformDuration(): number {
    if (
      this.durationDays.value == null ||
      this.durationHours.value == null ||
      this.durationMinutes.value == null
    )
      return 0;

    var hours = this.durationHours.value + this.durationDays.value * 24;
    var minutes = this.durationMinutes.value + hours * 60;
    return minutes * 60;
  }

  transformDatetime(date: string | null): string {
    if (date == null) return '';

    console.log(date);
    var fulldate = new RegExp(
      '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]T[0-9][0-9]:[0-9][0-9]'
    );
    var onlydate = new RegExp('[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]');
    var onlytime = new RegExp('[0-9][0-9]:[0-9][0-9]');

    if (fulldate.test(date)) {
      console.log('Full');
      return date;
    }

    if (onlydate.test(date)) {
      console.log('date');
      return date + 'T00:00';
    }

    if (onlytime.test(date)) {
      console.log('time');
      return '1000-01-01T' + date;
    }

    return '';
  }

  transformDatetimeForFrontend(date: string | null): string {
    if (date == null) return '';

    if (date.startsWith('1000-01-01T')) {
      console.log(date.substring(11));
      return date.substring(11);
    }

    return date;
  }

  transformRepeatDaysForFrontend(days: string[]) {
    if (days.includes('MONDAY')) this.repeatMonday.setValue(true);
    if (days.includes('TUESDAY')) this.repeatTuesday.setValue(true);
    if (days.includes('WEDNESDAY')) this.repeatWednesday.setValue(true);
    if (days.includes('THURSDAY')) this.repeatThursday.setValue(true);
    if (days.includes('FRIDAY')) this.repeatFriday.setValue(true);
    if (days.includes('SATURDAY')) this.repeatSaturday.setValue(true);
    if (days.includes('SUNDAY')) this.repeatSunday.setValue(true);
  }

  // duration is in the form "PT26H3M"
  transformDurationForFrontEnd(duration: string) {
    if (duration == null) return;

    if (duration.includes('H')) {
      const hIndex = duration.indexOf('H');
      var hours = parseInt(duration.substring(2, hIndex));
      const days = Math.floor(hours / 24);
      hours = hours - days * 24;
      this.durationDays.setValue(days);
      this.durationHours.setValue(hours);
    }

    if (duration.includes('M')) {
      const mIndex = duration.indexOf('M');
      var startindex: number;
      if (duration.includes('H')) {
        startindex = duration.indexOf('H');
      } else {
        startindex = 2;
      }

      const minutes = parseInt(duration.substring(startindex + 1, mIndex));
      this.durationMinutes.setValue(minutes);
    }
  }
}
