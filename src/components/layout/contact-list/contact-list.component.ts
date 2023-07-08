import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ContactType, CallImportRecord } from 'src/models/call-import-record.model';
import { EventsService } from 'src/service/events.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  numberList = [];
  filter = new FormControl('', { nonNullable: true });
  contacts: ContactType[] = [];
  allEvents: CallImportRecord[] = [];

  constructor(private eventService: EventsService,
    private modalService: NgbModal) {
    this.eventService.latestEvents.subscribe((events: CallImportRecord[]) => {
      if (events?.length > 0) {
        this.initContacts(events)
      }
    })

    this.eventService.defaultContacts$.subscribe((defaultContacts) => {
      this.numberList = defaultContacts;
      let events = this.eventService.getLatestsEvents();
      this.initContacts(events)
    })
  }


  selectAllContact() {
    this.contacts.forEach(x => x.checked = true)
    this.filterContact();
  }

  removeAllContact() {
    this.contacts.forEach(x => x.checked = false);
    this.filterContact();
  }

  selectDefault() {
    this.contacts.forEach(x => {
      x.checked = this.numberList?.some(y => y == x.number) ? true : false
    });

    this.filterContact();
  }

  initContacts(events: CallImportRecord[]) {
    this.contacts = [];
    events?.forEach(x => {

      let isContactFound = this.numberList?.find(y => y === x.phone) ? true : false;

      if (!this.contacts.find(y => y.number === x.phone)) {
        this.contacts.push({
          name: x.title.length > 0 ? x.title : x.phone,
          number: x.phone,
          count: 1,
          checked: isContactFound
        })
      } else {
        let contact = this.contacts.find(y => y.number === x.phone)
        contact.count += 1;
      }

    })

    this.sortContacts();
  }

  sortContacts() {
    this.contacts = this.contacts.sort((a, b) => {
      const checkedA = a.checked ? 1 : 0;
      const checkedB = b.checked ? 1 : 0;

      if (checkedB - checkedA !== 0) {
        return checkedB - checkedA;
      }
      return a.name.localeCompare(b.name);
    });
  }

  filterContact(): void {
    let filteredContact = this.contacts.filter(item => item.checked).map((x) => x.number);
    this.sortContacts();
    this.eventService.setFilteredContacts(filteredContact);
  }

  closeResult = '';
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  numbers: string;
  saveContacts() {
    const trimmedItems = this.numbers.trim();
    const splitItems = trimmedItems.split(",");

    const cleanedItems = splitItems.map(item => item.replace(/'/g, "").trim());
    this.eventService.setDefaultContacts(cleanedItems);
    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
