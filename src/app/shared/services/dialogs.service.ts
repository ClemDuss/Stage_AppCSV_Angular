import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { ProvidersService } from "./providers.service";

import { NewProviderComponent } from '../../view/new-provider/new-provider.component';
import { EditComponent } from '../../view/edit/edit.component';
import { CorrespondenceComponent } from '../components/correspondence/correspondence.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(
    public dialog: MatDialog,
    private providersService: ProvidersService,
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

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }
}
