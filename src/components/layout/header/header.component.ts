import { Component } from '@angular/core';
import { EventsService } from 'src/service/events.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private eventService: EventsService) {
    this.eventService.setEventView('calender')
  }

  showView(value: string) {
    this.eventService.setEventView(value)
  }

}
