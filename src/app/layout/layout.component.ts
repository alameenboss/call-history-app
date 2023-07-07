import { Component } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor(public eventService: EventsService) {    
  }
}
