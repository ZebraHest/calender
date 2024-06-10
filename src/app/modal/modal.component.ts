import { Component, inject, TemplateRef } from '@angular/core';
import { EventData } from '../data/event-data';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedCloseService } from '../shared-close.service';
import { AxiosService } from '../axios.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


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

  errors = [];

  constructor(private closeService: SharedCloseService) {}

  saveandclose() {
    this.axiosService
      .request('POST', '/event/add', {
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
      })
      .catch((e) => {
        console.log(e);
      })
      .then((response) => {
        this.activeModal.close();
        this.closeService.sendCloseEvent();
      });
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
    if(date == null)
      return "";

    console.log(date);
    var fulldate = new RegExp(
      '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]T[0-9][0-9]:[0-9][0-9]'
    );
    var onlydate = new RegExp('[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]');
    var onlytime = new RegExp('[0-9][0-9]:[0-9][0-9]');

    if(fulldate.test(date)){
      console.log("Full");
      return date;
    }

    if (onlydate.test(date)) {
      console.log('date');
      return date+"T00:00";
    }

    if (onlytime.test(date)) {
      console.log('time');
      return "2024-01-01T"+date;
    }


    return '';
  }
}
