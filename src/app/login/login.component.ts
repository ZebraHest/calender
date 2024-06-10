import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Output() onSubmitLoginEvent = new EventEmitter();
  @Output() onSubmitRegisterEvent = new EventEmitter();
  
  firstName = new FormControl('');
  lastName= new FormControl('');
  login= new FormControl('');
  password= new FormControl('');
  active= new FormControl('login');

  onSubmitLogin(): void {
    this.onSubmitLoginEvent.emit({
      login: this.login.value,
      password: this.password.value,
    });
    this.reset();
  }

  onSubmitRegister() {
    this.onSubmitRegisterEvent.emit({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      login: this.login.value,
      password: this.password.value,
    });
    this.reset();
  }
  onRegisterTab() { 
    this.reset();
    this.active.setValue('register');
  }
  onLoginTab() {
    this.reset();
    this.active.setValue('login');
  }

  reset():void{
    this.firstName.setValue('');
    this.lastName.setValue('');
    this.login.setValue('');
    this.password.setValue('');
  }
}
