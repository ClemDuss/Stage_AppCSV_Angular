import { Component, OnInit } from '@angular/core';

import { ProvidersService } from '../../../../shared/services/providers.service';

@Component({
  selector: 'app-to-export-provider',
  templateUrl: './to-export-provider.component.html',
  styleUrls: ['./to-export-provider.component.css']
})
export class ToExportProviderComponent implements OnInit {
  checkBoxContent = 'À exporter';
  isChecked: boolean;

  constructor(
    public providersService: ProvidersService,
  ) { 
    this.isChecked = providersService.getToExport();
  }

  ngOnInit(): void {
  }

  checkProvider(){
    this.providersService.clickCheckProvider();
    this.isChecked = this.providersService.getToExport();
  }

  isToExport(){
    return this.providersService.getToExport();
  }

}
