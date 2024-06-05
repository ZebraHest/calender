import { Component, Output , EventEmitter} from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {
  @Output() loginEvent = new EventEmitter();
  @Output() logoutEvent = new EventEmitter();

  constructor(private userService: UserService) {};

  logout() {
    this.logoutEvent.emit();
    this.userService.setAuthToken(null);
  }

  login() {
    this.loginEvent.emit();
  }
}
