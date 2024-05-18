import { Component, inject, TemplateRef } from '@angular/core';
import { EventData } from '../event-data';


import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { EventServiceService } from '../event-service.service';

@Component({
  selector: 'app-modal2',
  standalone: true,
  imports: [NgbDatepickerModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  private modalService = inject(NgbModal);
  activeModal = inject(NgbActiveModal);
  eventService: EventServiceService = inject(EventServiceService);

  closeResult = '';
  date: any;

  // open(content: TemplateRef<any>) {
  //   this.modalService
  //     .open(content, { ariaLabelledBy: 'modal-basic-title' })
  //     .result.then(
  //       (result) => {
  //         this.closeResult = `Closed with: ${result}`;
  //         console.log(this.closeResult);
  //       },
  //       (reason) => {
  //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //         console.log(this.closeResult);
  //       }
  //     );
  //     console.log(this.closeResult);
  // }

  saveandclose(t: any[]) {
    console.log(t);
    let eventData: EventData = {
      title: t.at(0),
      id: 0,
      description: '',
      startTime: t.at(1),
      endTime: t.at(2),
      period: '',
      userId: ''
    }
    console.log(eventData);
    this.eventService.addEvent(eventData);
    this.activeModal.close();
  }
}
