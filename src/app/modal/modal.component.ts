import { Component, inject, TemplateRef } from '@angular/core';


import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal2',
  standalone: true,
  imports: [NgbDatepickerModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  private modalService = inject(NgbModal);
  activeModal = inject(NgbActiveModal);

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

  saveandclose(t: any[]){
    console.log(t);
    this.activeModal.close();
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
