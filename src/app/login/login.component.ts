import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Output() onSubmitLoginEvent = new EventEmitter();
  @Output() onSubmitRegisterEvent = new EventEmitter();

  firstName: string = '';
  lastName: string = '';
  login: string = '';
  password: string = '';
  active: string = 'login';

  onSubmitLogin(): void {
    this.onSubmitLoginEvent.emit({
      login: this.login,
      password: this.password,
    });
    this.reset();
  }

  onSubmitRegister() {
    this.onSubmitRegisterEvent.emit({
      firstName: this.firstName,
      lastName: this.lastName,
      login: this.login,
      password: this.password,
    });
    this.reset();
  }
  onRegisterTab() {
    this.reset();
    this.active = 'register';
  }
  onLoginTab() {
    this.reset();
    this.active = 'login';
  }

  reset():void{
    console.log("RESET");
    this.firstName = '';
    this.lastName = '';
    this.login = '';
    this.password = '';
  }
}
