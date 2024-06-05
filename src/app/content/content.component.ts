import { Component, inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ButtonsComponent } from '../buttons/buttons.component'
import { UserService } from '../user.service';
import { WelcomeComponent } from "../welcome/welcome.component";
import { EventpanelComponent } from "../eventpanel/eventpanel.component";
import { response } from 'express';
import { CalendarComponent } from '../calendar/calendar.component';

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

  constructor(private userService: UserService) {}

  //   ngOnInit(): void{
  //     this.userService.request(
  //         "GET",
  //         "/all",
  //         ""
  //     ).then(
  //         (response) => this.data = response.data
  //     );
  //   }

  showComponent(componentToShow: string): void{
    this.componentToShow = componentToShow;
  }


  onLogin(input: any): void {
    // this.userService.getAllUsers();
    this.userService.request('POST', '/login', {
      login: input.login,
      password: input.password,
    }).then(response => {
      this.userService.setAuthToken(response.data.token);
      console.log(response);
      this.componentToShow = 'event';
    });
  }

  onRegister(input: any): void {
    console.log(input.login);
    console.log(input.password);
    // this.userService.getAllUsers();
    var stuff = this.userService
      .request('POST', '/register', {
        firstName: input.firstName,
        lastName: input.lastName,
        login: input.login,
        password: input.password,
      })
      .then((response) => {
        this.userService.setAuthToken(response.data.token);
        this.componentToShow = 'event';
      });

    console.log(stuff);
  }
}
