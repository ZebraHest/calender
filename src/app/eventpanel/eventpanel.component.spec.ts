import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventpanelComponent } from './eventpanel.component';

describe('EventpanelComponent', () => {
  let component: EventpanelComponent;
  let fixture: ComponentFixture<EventpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventpanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
