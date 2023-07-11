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
  allContacts: ContactType[] = [];
  selectedContact: ContactType[] = [];

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

    this.filter.valueChanges.subscribe(term => this.searchContact(term));
  }

  searchContact(searchTerm) {
    if (searchTerm == '') {
      this.contacts = this.allContacts;
      this.filterContact();
    } else {
      let filtredContact = this.allContacts?.filter((event) => {
        const term = searchTerm.toLowerCase();
        return (
          event.name.toLowerCase().includes(term) ||
          event.number.includes(term)
        );
      });
      this.contacts = filtredContact;
    }
  }


  selectAllContact() {
    this.allContacts.forEach(x => x.checked = true)
    this.selectedContact = this.allContacts;
    this.contacts = this.allContacts;
    this.filterContact();
  }

  removeAllContact() {
    this.selectedContact = [];
    this.allContacts.forEach(x => x.checked = false);
    this.contacts = this.allContacts;
    this.filterContact();
  }

  selectDefault() {
    this.contacts = this.allContacts;
    this.selectedContact = [];
    this.contacts.forEach(x => {
      x.checked = this.numberList?.some(y => y == x.number) ? true : false

      if (x.checked) {
        this.selectedContact.push(x)
      }

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

    this.allContacts = this.contacts;
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

  selectContact(contact) {
    if (contact.checked) {
      if (!this.selectedContact.find(y => y.number === contact.number)) {
        this.selectedContact.push(contact)
      }
    } else {
      let indexOfContact = this.selectedContact.findIndex(y => y.number === contact.number);

      if (indexOfContact >= 0) {
        this.selectedContact.splice(indexOfContact, 1)
      }
    }
    this.filterContact()
  }

  filterContact(): void {
    this.allContacts.forEach(x => {
      x.checked = this.selectedContact?.some(y => y.number == x.number) ? true : false
    });

    let filteredContact = this.selectedContact.map((x) => x.number);
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
