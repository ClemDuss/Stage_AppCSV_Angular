import { Component, OnInit } from '@angular/core';

import { ProvidersService } from '../../../shared/services/providers.service';
import { DialogsService } from 'src/app/shared/services/dialogs.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public moveUpProviderBtn_icon: string = 'expand_less';
  public moveDownProviderBtn_icon: string = 'expand_more';

  public editProviderBtn_content: string = 'Modifier';
  public editProviderBtn_icon: string = 'edit';

  public toExportCheckBox_content: string = 'À exporter';

  public deleteProviderBtn_content: string = 'Supprimer';
  public deleteProviderBtn_icon: string = 'delete';

  constructor(
    public providersService : ProvidersService,
    private _dialogsService: DialogsService,
  ) {}

  ngOnInit(): void {
  }

  public moveUpProviderBtn_click(): void{
    this.providersService.moveProviderUp();
  }

  public moveDownProviderBtn_click(): void{
    this.providersService.moveProviderDown();
  }

  public editProviderBtn_click(): void{
    this._dialogsService.openEditProviderDialog();
  }

  public toExportCheckBox_change(): void{
    this.providersService.clickCheckProvider();
  }

  public toExportCheckBox_value(): boolean{
    return this.providersService.getToExport();
  }

  public deleteProviderBtn_click(): void{
    this.providersService.deleteProvider();
  }

}
