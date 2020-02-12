import { Component, OnInit } from '@angular/core';

import { CsvService } from '../../../shared/services/csv.service';

@Component({
  selector: 'app-create-csv',
  templateUrl: './create-csv.component.html',
  styleUrls: ['./create-csv.component.css']
})
export class CreateCsvComponent implements OnInit {
  content = "Exporter le CSV";

  constructor(
    private csvsService: CsvService,
  ) { }

  ngOnInit(): void {
  }

  export(){
    this.csvsService.exportCSV();
  }

}
