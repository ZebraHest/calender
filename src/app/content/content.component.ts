import { Component, inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ButtonsComponent } from '../buttons/buttons.component'
import { WelcomeComponent } from "../welcome/welcome.component";
import { EventpanelComponent } from "../eventpanel/eventpanel.component";
import { response } from 'express';
import { CalendarComponent } from '../calendar/calendar.component';
import { AxiosService } from '../axios.service';

@Component({
    selector: 'app-content',
    standalone: true,
    templateUrl: './content.component.html',
    styleUrl: './content.component.css',
    imports: [LoginComponent, ButtonsComponent, WelcomeComponent, EventpanelComponent, CalendarComponent]
})
export class ContentComponent {
  data: string[] = [];
  componentToShow: string = "event";

  constructor(private axiosService: AxiosService) {}

  showComponent(componentToShow: string): void{
    this.componentToShow = componentToShow;
  }


  onLogin(input: any): void {
    // this.userService.getAllUsers();
    this.axiosService.request('POST', '/user/login', {
        login: input.login,
        password: input.password,
      })
      .then((response) => {
        this.axiosService.setAuthToken(response.data.token);
        this.componentToShow = 'event';
      });
  }

  onRegister(input: any): void {
    var stuff = this.axiosService
      .request('POST', '/user/register', {
        firstName: input.firstName,
        lastName: input.lastName,
        login: input.login,
        password: input.password,
      })
      .then((response) => {
        this.axiosService.setAuthToken(response.data.token);
        this.componentToShow = 'event';
      });
  }
}
