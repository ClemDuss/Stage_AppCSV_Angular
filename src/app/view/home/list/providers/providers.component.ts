import { Component, OnInit } from '@angular/core';

import { ProvidersService } from '../../../../shared/services/providers.service';

import { Provider } from '../../../../shared/models/provider';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  providers : Array<Provider>;
  selectedProvider;
  selectedProviderIndex;
  displayedColumns: string[] 

  constructor(
    public providersService: ProvidersService,
  ) {
    this.providers = this.providersService.getProviders();
    this.selectedProvider = this.providersService.getSelectedProvider();
    this.selectedProviderIndex = this.providersService.getSelectedProviderIndex();
    this.displayedColumns = ['name', 'validFile'];
  }

  ngOnInit(): void {
  }

  selectThisProvider(index){
    this.providersService.setSelectedProvider(index);
    this.selectedProvider = this.providersService.getSelectedProvider();
    this.selectedProviderIndex = this.providersService.getSelectedProviderIndex();
  }

}
