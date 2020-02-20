import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

import { ProvidersService } from 'src/app/shared/services/providers.service';
import { CsvService } from 'src/app/shared/services/csv.service';

import { Provider } from 'src/app/shared/models/provider';
import { DialogsService } from 'src/app/shared/services/dialogs.service';

@Component({
  selector: 'app-in-export',
  templateUrl: './in-export.component.html',
  styleUrls: ['./in-export.component.css']
})
export class InExportComponent implements OnInit {
  providers: Array<Provider>;
  filesNames: any[];

  exportStatus = [];
  subscribeExportFileStatus: Subscription;
  exportArticleDetailsState = [];
  subscribeExportArticleDetailsState: Subscription;

  isExportEnded;
  subscriptionIsExportEnded: Subscription;

  constructor(
    private providersService: ProvidersService,
    private csvService: CsvService,
    private dialogsService: DialogsService,
  ) {
    this.providers = providersService.getProviders();
    this.filesNames = csvService.filesNames;

    this.subscribeExportFileStatus = csvService.getExportFileStatus().subscribe((data)=>{
      this.exportStatus=data;
    });
    this.subscribeExportArticleDetailsState = csvService.getExportArticleDetailsState().subscribe((data)=>{
      this.exportArticleDetailsState=data;
    });

    this.subscriptionIsExportEnded = csvService.getIsExportEnded().subscribe((data)=>{
      this.isExportEnded = data;
    });
  }

  ngOnInit(): void {
  }

  okClick(){
    this.dialogsService.closeExportDialog();
  }

}
