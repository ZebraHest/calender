import { Component, Output , EventEmitter} from '@angular/core';
import { AxiosService } from '../axios.service';


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

  constructor(private axiosService: AxiosService) {};

  logout() {
    this.logoutEvent.emit();
    this.axiosService.setAuthToken(null);
  }

  login() {
    this.loginEvent.emit();
  }
}
