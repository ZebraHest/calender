import { Component, Output, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventpanelComponent } from './eventpanel/eventpanel.component'; 
import { CalenderComponent } from './calender/calender.component';
import { EventData } from './event-data';
import { EventServiceService } from './event-service.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EventpanelComponent, CalenderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calender';



 

  constructor(){
   

    
  }
}
