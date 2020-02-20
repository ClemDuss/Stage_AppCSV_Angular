import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

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

  openNewProviderDialog() {
    const dialogRef = this.dialog.open(NewProviderComponent);

    this.providersService.resetSelectedIndex();

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  closeNewProviderDialog() {
    const dialogRef = this.dialog.closeAll();
  }

  openCorrespondenceDialog() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(CorrespondenceComponent);

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  openEditProviderDialog(){
    const dialogRef = this.dialog.open(EditComponent);
  }

  openExportDialog(){
    const dialogRef = this.dialog.open(InExportComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.csvService.resetExportStates();
    });
  }

  closeExportDialog(){
    this.dialog.closeAll();
  }
}
