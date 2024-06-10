import { Component, Output, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventpanelComponent } from './eventpanel/eventpanel.component'; 
import { CalendarComponent } from './calendar/calendar.component';
import { ModalComponent } from './modal/modal.component';
import { ContentComponent } from './content/content.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EventpanelComponent, CalendarComponent, ModalComponent, ContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calendar';
  constructor(){
  }
}
