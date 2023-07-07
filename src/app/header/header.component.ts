import { Component } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private eventService: EventsService) {
    this.eventService.setEventView('calender')
  }

  showCalender(value: string) {
    this.eventService.setEventView(value)
    // this.filterDate()
  }

}
