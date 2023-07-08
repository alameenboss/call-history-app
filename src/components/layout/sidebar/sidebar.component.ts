import { Component } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { EventsService } from 'src/service/events.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private eventService: EventsService) {
  }

  flatpickrChanged(selectedDates) {
    this.eventService.setCalenderViewDate(selectedDates[0])
    this.eventService.setCalenderView(CalendarView.Day)
  }

  flatpickrMonthChanged(instance) {
    this.eventService.setCalenderView(CalendarView.Month)
    this.eventService.setCalenderViewDate(new Date(instance.currentYear, instance.currentMonth, 1))
  }
}
