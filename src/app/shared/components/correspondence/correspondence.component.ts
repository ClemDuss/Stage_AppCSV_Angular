import { Component, OnInit } from '@angular/core';

import { ProvidersService } from '../../services/providers.service';
import { CsvService } from '../../services/csv.service';

@Component({
  selector: 'app-correspondence',
  templateUrl: './correspondence.component.html',
  styleUrls: ['./correspondence.component.css']
})
export class CorrespondenceComponent implements OnInit {
  providers;
  headerOptions;

  categs = [];

  constructor(
    private providersService: ProvidersService,
    private csvService: CsvService,
  ) { 
    this.headerOptions = csvService.getHeadLine(providersService.getSelectedProvider());
    this.categs.push('EAN', 'Prix d\'ahcat', 'Description', 'Famille d\'article');
  }

  ngOnInit(): void {
  }

}
