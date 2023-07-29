import { Component } from '@angular/core';
import { EventsService } from 'src/service/events.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor(public eventService: EventsService) {
  }

  showSideBar = true;
  handleToggleSidebar(event) {
    this.showSideBar = event;
  }
}
