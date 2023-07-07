import { Injectable } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { BehaviorSubject, Observable } from 'rxjs';
import { CallImportRecord, ContactType } from 'src/models/call-import-record.model';


@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor() { }

  private eventsSubject: BehaviorSubject<CallImportRecord[]> = new BehaviorSubject(null);
  latestEvents: Observable<CallImportRecord[]> = this.eventsSubject.asObservable();
  addEvent(newEvents: CallImportRecord[]) {
    this.eventsSubject.next(newEvents)
  }

  getLatestsEvents() {
    return this.eventsSubject.getValue();
  }

  private eventViewSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  eventView$: Observable<string> = this.eventViewSubject.asObservable();
  setEventView(value: string) {
    this.eventViewSubject.next(value)
  }

  getEventView() {
    return this.eventViewSubject.getValue()
  }


  private calenderViewSubject: BehaviorSubject<CalendarView> = new BehaviorSubject(CalendarView.Month);
  calenderView$: Observable<CalendarView> = this.calenderViewSubject.asObservable();
  setCalenderView(value: CalendarView) {
    this.calenderViewSubject.next(value)
  }

  private calenderViewDateSubject: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  calenderViewDate$: Observable<Date> = this.calenderViewDateSubject.asObservable();
  setCalenderViewDate(value: Date) {
    this.calenderViewDateSubject.next(value)
  }

  private filteredContactsSubject: BehaviorSubject<string[]> = new BehaviorSubject(null);
  filteredContacts$: Observable<string[]> = this.filteredContactsSubject.asObservable();
  setFilteredContacts(contacts: string[]) {
    this.filteredContactsSubject.next(contacts)
  }

  private defaultContactsSubject: BehaviorSubject<string[]> = new BehaviorSubject(null);
  defaultContacts$: Observable<string[]> = this.defaultContactsSubject.asObservable();
  setDefaultContacts(contacts: string[]) {
    this.defaultContactsSubject.next(contacts)
  }

  extractedEventsByDate() {
    let _extractedEvents: CallImportRecord[] = [];
    let calenderViewDate = this.calenderViewDateSubject.getValue();

    let _events = this.eventsSubject.getValue();
    let filteredContact = this.filteredContactsSubject.getValue();

    switch (this.calenderViewSubject.getValue()) {
      case 'month':
        _extractedEvents = _events?.filter(x =>
          filteredContact?.some((d) => d == x.phone) &&
          x.start.getMonth() == calenderViewDate.getMonth() &&
          x.start.getFullYear() == calenderViewDate.getFullYear());
        break;
      case 'day':
        _extractedEvents = _events?.filter(x =>
          filteredContact?.some((d) => d == x.phone) &&
          x.start.getDate() == calenderViewDate.getDate() &&
          x.start.getMonth() == calenderViewDate.getMonth() &&
          x.start.getFullYear() == calenderViewDate.getFullYear());
        break;
      default:
        break;
    }
    return _extractedEvents;
  }
}
