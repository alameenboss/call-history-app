import { Component } from '@angular/core';
import { CallDateType, CallImportRecord } from 'src/models/call-import-record.model';
import { EventsService } from 'src/service/events.service';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss']
})
export class ListviewComponent {
  events: CallImportRecord[] = [];
  filteredEvent: CallImportRecord[] = [];
  constructor(private eventService: EventsService) {
    this.eventService.latestEvents.subscribe(x => {
      this.events = x
      this.filterDate()
    });
    this.eventService.calenderViewDate$.subscribe(() => this.filterDate())
    this.eventService.calenderView$.subscribe(() => this.filterDate())
    this.eventService.filteredContacts$.subscribe(() => this.filterDate());
  }

  filterDate() {

    let filterData = [];
    let _extractedEvents: CallImportRecord[] = this.eventService.extractedEventsByDate()
    _extractedEvents.forEach(x => {
      if (!filterData.find(y => y.phone === x.phone)) {
        filterData.push({
          title: x.title,
          phone: x.phone,
          count: 1,
          callDate: [{ date: x.start, callType: x.callType, durationT: x.durationT, durationS: x.durationS }]
        })
      } else {
        let __ = filterData.find(y => y.phone === x.phone)
        __.count += 1;
        __.callDate.push({ date: x.start, callType: x.callType, durationT: x.durationT, durationS: x.durationS })
      }
    })
    this.filteredEvent = filterData;
  }

  getTotalCallWhichIsMoreThan2Mins(callDate: CallDateType[]) {
    return callDate.filter(x => parseInt(x.durationS) > 120).length
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
}
