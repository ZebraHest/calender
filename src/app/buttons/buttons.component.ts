import { Component, Output , EventEmitter} from '@angular/core';

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
}
