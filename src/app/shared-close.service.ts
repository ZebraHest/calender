import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedCloseService {
  private subject = new Subject<any>();
  sendCloseEvent() {
    this.subject.next("");
  }

  getCloseEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
