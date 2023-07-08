import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/layout/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalenderViewComponent } from './components/view/calenderview/calenderview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { FileuploadComponent } from './components/fileupload/fileupload.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { SidebarComponent } from 'src/components/layout/sidebar/sidebar.component';
import { ListviewComponent } from 'src/components/view/listview/listview.component';
import { TableviewComponent } from 'src/components/view/tableview/tableview.component';
import { ContactListComponent } from './components/layout/contact-list/contact-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CalenderViewComponent,
    FileuploadComponent,
    HeaderComponent,
    SidebarComponent,
    ListviewComponent,
    TableviewComponent,
    LayoutComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCsvParserModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
