import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import { Provider } from '../models/provider';

@Injectable({
  providedIn: 'root'
})
export class SnackbarsService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  public snackbar(message: string, action: string = 'OK', delay:number = 3000): void{
    this._snackBar.open(message, action, {
      duration: delay,
    });
  }

  public providerAdded(provider: Provider): void{
    this._snackBar.open('Le fournisseur ' + provider.name + ' a été créé.', 'OK', {
      duration: 3000,
    });
  }

  public correspondenceSetted(provider: Provider): void{
    this._snackBar.open('Les correspondances de ' + provider.name + ' ont étées mises à jour !', 'OK', {
      duration: 4000,
    });
  }

  public editedProvider(): void{
    this._snackBar.open('Les informations du fournisseur ont étées mises à jour !', 'OK', {
      duration: 3000,
    });
  }

  public deleteProvider(provider:Provider): void{
    this._snackBar.open('Le fournisseur ' + provider.name + ' a été supprimé.', 'OK', {
      duration: 3000,
    });
  }
}
