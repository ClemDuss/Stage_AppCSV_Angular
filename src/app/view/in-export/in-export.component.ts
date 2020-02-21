import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProvidersService } from 'src/app/shared/services/providers.service';
import { CsvService } from 'src/app/shared/services/csv.service';

import { Provider } from 'src/app/shared/models/provider';
import { DialogsService } from 'src/app/shared/services/dialogs.service';

interface StateArray{
  name: string;
  state: string;
}

@Component({
  selector: 'app-in-export',
  templateUrl: './in-export.component.html',
  styleUrls: ['./in-export.component.css']
})
export class InExportComponent implements OnInit {
  public providers: Array<Provider>;
  public filesNames: any[];

  public okBtn_content = 'OK';

  public exportStatus: StateArray;
  private _subscribeExportFileStatus: Subscription;
  public exportArticleDetailsState: StateArray;
  private _subscribeExportArticleDetailsState: Subscription;

  public isExportEnded: boolean;
  private _subscriptionIsExportEnded: Subscription;

  constructor(
    private _providersService: ProvidersService,
    private _csvService: CsvService,
    private _dialogsService: DialogsService,
  ) {
    this.providers = _providersService.getProviders();
    this.filesNames = _csvService.filesNames;

    this._subscribeExportFileStatus = _csvService.getExportFileStatus().subscribe((data)=>{
      this.exportStatus=data;
    });
    this._subscribeExportArticleDetailsState = _csvService.getExportArticleDetailsState().subscribe((data)=>{
      this.exportArticleDetailsState=data;
    });

    this._subscriptionIsExportEnded = _csvService.getIsExportEnded().subscribe((data)=>{
      this.isExportEnded = data;
    });
  }

  ngOnInit(): void {
  }

  public okBtn_click(): void{
    this._dialogsService.closeExportDialog();
  }

}
