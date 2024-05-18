import { Component, Input, TemplateRef, inject } from '@angular/core';
import { EventData } from '../event-data';
import { EventServiceService } from '../event-service.service';
import { EventSourceInput } from '@fullcalendar/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

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
  eventService: EventServiceService = inject(EventServiceService);

  constructor() {
    this.eventService.getAllEvents().subscribe((list: EventData[]) => {
      this.events = list;
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

  mouseOverEvent() {
    console.log('Over Event');
  }

  private modalService = inject(NgbModal);

  open() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'World';
    console.log(modalRef);
  }
}
