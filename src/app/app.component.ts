import { Component, Output, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventpanelComponent } from './eventpanel/eventpanel.component'; 
import { CalendarComponent } from './calendar/calendar.component';
import { EventData } from './data/event-data';
import { EventServiceService } from './event-service.service';
import { ModalComponent } from './modal/modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
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
