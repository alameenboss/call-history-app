import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { CallImportRecord } from '../../models/call-import-record.model';
import { EventsService } from 'src/service/events.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent {
  @ViewChild('fileImportInput') fileImportInput: ElementRef;
  header: boolean = true;
  constructor(
    private eventsService: EventsService,
    private ngxCsvParser: NgxCsvParser) {

  }

  fileChangeListener(): void {
    const files = this.fileImportInput.nativeElement.files;
    if (files.length <= 0) {
      alert("Choose a file to process");
      return;
    }
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',', encoding: 'utf8' })
      .pipe().subscribe({
        next: (result): void => {
          let records = this.parseCsv(result);
          this.eventsService.addEvent(records);
          this.fileImportInput.nativeElement.files = null;
        },
        error: (error: NgxCSVParserError): void => {
          this.fileImportInput.nativeElement.files = null;
        }
      });


  }

  parseCsv(rows): CallImportRecord[] {
    let items: CallImportRecord[] = [];
    rows.forEach(rowItem => {
      const [day, month, year, hour, minute, second, ampm] = rowItem.Date.split(/\/|:|\s/);
      let parsedDate = new Date(parseInt(`20${year}`), month - 1, day, hour % 12 + (ampm === 'PM' ? 12 : 0), minute, second);

      let ph = rowItem.Phone.replace(/\s/g, "").replace(/[-]/g, "").replace("+91", "");

      if (ph.length > 10 && ph.startsWith("91")) {
        ph = ph.substring(2, ph.length)
      }

      items.push(
        {
          start: parsedDate,
          title: rowItem.Name,
          phone: ph,
          callType: rowItem.Type,
          durationT : rowItem.Duration_timespan,
          durationS : rowItem.Duration_Sec,
          
        })
    })
    return items;
  }
}

