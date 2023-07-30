import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CallImportRecord } from 'src/models/call-import-record.model';
import { EventsService } from 'src/service/events.service';

@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.scss']
})
export class TableviewComponent {
  filter = new FormControl('', { nonNullable: true });
  events: CallImportRecord[] = [];
  filteredEvent: CallImportRecord[] = [];
  constructor(private eventService: EventsService) {
    this.eventService.latestEvents.subscribe(events => {
      this.events = events
      this.serchEventsByTerm('')
    })
    this.filter.valueChanges.subscribe(term => this.serchEventsByTerm(term));
    this.eventService.calenderViewDate$.subscribe(() => this.serchEventsByTerm(''))
    this.eventService.calenderView$.subscribe(() => this.serchEventsByTerm(''))
    this.eventService.filteredContacts$.subscribe(() => this.serchEventsByTerm(''));
  }


  private serchEventsByTerm(searchTerm: string) {
    let _extractedEvents: CallImportRecord[] = this.eventService.extractedEventsByDate();
    if (searchTerm == '') {
      this.filteredEvent = _extractedEvents;
    } else {
      let re = _extractedEvents?.filter((event) => {
        const term = searchTerm.toLowerCase();
        return (
          event.title.toLowerCase().includes(term) ||
          event.phone.includes(term) ||
          event.callType.toLowerCase().includes(term)
        );
      });
      this.filteredEvent = re;
    }
  }


}
