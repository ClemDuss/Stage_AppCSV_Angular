import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProvidersService } from "./providers.service";

import { NewProviderComponent } from '../../view/new-provider/new-provider.component';
import { EditComponent } from '../../view/edit/edit.component';
import { CorrespondenceComponent } from '../components/correspondence/correspondence.component';
import { InExportComponent } from 'src/app/view/in-export/in-export.component';
import { CsvService } from './csv.service';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(
    public dialog: MatDialog,
    private providersService: ProvidersService,
    private csvService: CsvService,
  ) { }

  public openNewProviderDialog(): void{
    this.dialog.open(NewProviderComponent);

    this.providersService.resetSelectedIndex();
  }

  public closeNewProviderDialog(): void{
    this.dialog.closeAll();
  }

  public openCorrespondenceDialog(): void{
    this.dialog.closeAll();
    this.dialog.open(CorrespondenceComponent);
  }

  public openEditProviderDialog(): void{
    this.dialog.open(EditComponent);
  }

  public openExportDialog(): void{
    const dialogRef = this.dialog.open(InExportComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.csvService.resetExportStates();
    });
  }

  public closeExportDialog(): void{
    this.dialog.closeAll();
  }
}
