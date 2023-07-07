import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';

import { EventsService } from '../events.service';
import { CallImportRecord, ContactType } from 'src/models/call-import-record.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calenderview',
  templateUrl: './calenderview.component.html',
  styleUrls: ['./calenderview.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CalenderViewComponent {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  refresh = new Subject<void>();
  events: CallImportRecord[] = [];
  allEvents: CallImportRecord[] = [];
  activeDayIsOpen: boolean = false;

  constructor(private eventService: EventsService) {

    this.eventService.calenderViewDate$.subscribe(x => {
      this.viewDate = x
    })
    this.eventService.calenderView$.subscribe((response: CalendarView) => {
      this.setView(response)
    })
    this.eventService.latestEvents.subscribe((response: CallImportRecord[]) => {
      this.allEvents = response;
      this.events = response;
    })

    this.eventService.filteredContacts$.subscribe((response: string[]) => {
      this.events = this.allEvents?.filter(x => response.includes(x.phone));
    })
  }

  stringToColour(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    let rgb = []
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF;
      let colorRGB = ('00' + value.toString(16)).substr(-2);
      colour += colorRGB;
      rgb.push(colorRGB)
    }
    const brightness = (parseInt(rgb[0], 16) * 299
      + parseInt(rgb[1], 16) * 587
      + parseInt(rgb[2], 16) * 114)
      / 1000
    const textColor = brightness > 125 ? '#0a0a0a' : '#f2f2f2';

    let x = { b: colour, t: textColor };
    return x
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      this.eventService.setCalenderViewDate(this.viewDate)
    }
  }

  setView(value: CalendarView) {
    this.view = value;
  }
}