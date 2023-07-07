# Call History App

This is an Angular application that allows users to view their call history in various views, including a calendar view, list view, and table view. Users can import a CSV file containing call records, which will be parsed and displayed on the screen. Additionally, users can apply filters to the call history based on phone number, date, month, and year.

## Features

- ***Calendar View***: Users can view their call history in a calendar format, allowing them to see call records based on specific dates.
- ***List View***: Users can view their call history in a list format, providing a chronological display of call records.
- ***Table View***: Users can view their call history in a table format, with columns representing different attributes of the call records.
- ***Import CSV***: Users can import a CSV file containing call records, which will be parsed and added to the application.
- ***Filtering***: Users can filter their call history based on phone number, date, month, and year, allowing them to narrow down the displayed records.

## Installation

Follow these steps to install and run the application:

1. Clone the repository: `git clone https://github.com/alameenboss/call-history-app.git`
2. Navigate to the project directory: `cd call-history-app`
3. Install the dependencies: `npm install`
4. Start the application: `ng serve`
5. Open your browser and visit: `http://localhost:4200`

## Usage

1. Importing CSV: On the application's interface, provide an option to import a CSV file. Users can click on the import button and select a CSV file containing call records. Once the file is selected, parse it and add the call events to the application.Attached [sample.csv](/sample_data.csv) to test.

2. Viewing Call History: Provide navigation or tabs for users to switch between calendar, list, and table views. Each view should display the call records based on the selected format. By default, display the list view.

3. Filtering Call History: Add filter options on the interface, allowing users to filter their call history based on phone number, date, month, and year. When users apply a filter, update the displayed call records accordingly.

## Contributing

Contributions to this project are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`.
3. Implement your feature or bug fix.
4. Run the tests to ensure all existing tests pass and add new tests for your code.
5. Commit your changes: `git commit -am 'Add feature'`.
6. Push to the branch: `git push origin feature-name`.
7. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

#### Calender Month View
![Calender Month View](/screenshots/calender-month-view.png)

#### Calender Week View
![Calender Week View](/screenshots/calender-week-view.png)

#### Calender Day View
![Calender Day View](/screenshots/calender-day-view.png)

#### List View
![List View](/screenshots/list-view.png)

#### Table View
![Table View](/screenshots/table-view.png)

#### Add Default Contacts
![Add Default Contacts](/screenshots/add-default-contacts.png)