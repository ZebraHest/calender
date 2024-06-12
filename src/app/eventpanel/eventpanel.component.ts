import { Component, Input, TemplateRef, afterNextRender, afterRender, inject } from '@angular/core';
import { EventData } from '../data/event-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { AxiosService } from '../axios.service';
import { MatDialog } from '@angular/material/dialog';
import { SharedCloseService } from '../shared-close.service';
import { Subscription } from 'rxjs';
import { afterMain } from '@popperjs/core';

@Component({
  selector: 'app-eventpanel',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './eventpanel.component.html',
  styleUrl: './eventpanel.component.css',
})
export class EventpanelComponent {
  filteredEvents: EventData[] = [];
  events: EventData[] = [];
  axiosService: AxiosService = inject(AxiosService);

  clickEventsubscription: Subscription;

  constructor(private sharedService: SharedCloseService) {
    this.clickEventsubscription = this.sharedService
      .getCloseEvent()
      .subscribe(() => {
        this.get();
      });

        
  }

  ngOnInit(){
    this.get();
  }

  get() {
    this.axiosService.request('GET', '/event/all', {}).then((response) => {
      this.events = response.data;
      this.filteredEvents = this.events;
    });
  }

  filterResults(text: string) {
    if (!text) this.filteredEvents = this.events;

    this.filteredEvents = this.events.filter(
      (e) =>
        e.title?.toLowerCase().includes(text.toLowerCase()) ||
        e.description?.toLowerCase().includes(text.toLowerCase())
    );
  }

  private modalService = inject(NgbModal);

  open() {
    const modalRef = this.modalService.open(ModalComponent, {
      // data: { name: 'tets' },
      // disableClose: true,
    });
  }

  currentEvent: EventData | undefined;

  edit(event: EventData) {
    console.log(event);
    const modalRef = this.modalService.open(ModalComponent);
    console.log('1');
    modalRef.componentInstance.editEvent = event;
    console.log('2');
  }
}
