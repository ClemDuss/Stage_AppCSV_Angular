import { Component, OnInit } from '@angular/core';

import { ProvidersService } from '../../../../shared/services/providers.service';

import { Provider } from '../../../../shared/models/provider';
import { DialogsService } from 'src/app/shared/services/dialogs.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  private _providers : Array<Provider>;
  private _selectedProvider: Provider;
  private _selectedProviderIndex: number;
  public displayedColumns: string[] 

  constructor(
    public providersService: ProvidersService,
    private _dialogsService: DialogsService,
  ) {
    this._providers = this.providersService.getProviders();
    this._selectedProvider = this.providersService.getSelectedProvider();
    this._selectedProviderIndex = this.providersService.getSelectedProviderIndex();
    this.displayedColumns = ['name', 'validFile', 'toExport'];
  }

  ngOnInit(): void {
  }

  public selectThisProvider(index): void{
    this.providersService.setSelectedProvider(index);
    this._selectedProvider = this.providersService.getSelectedProvider();
    this._selectedProviderIndex = this.providersService.getSelectedProviderIndex();
  }

  public openEditProviderDialog(): void{
    this._dialogsService.openEditProviderDialog();
  }

}
