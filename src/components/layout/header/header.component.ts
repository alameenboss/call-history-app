import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() toggleSidebarEvent = new EventEmitter(true);
  showView(value: string) {
    this.eventService.setEventView(value)
  }

  showSideBar = true;

  toggleSidebar() {
    this.showSideBar = !this.showSideBar;
    this.toggleSidebarEvent.emit(this.showSideBar)
  }

}
