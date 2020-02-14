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

  providerAdded(provider: Provider){
    this._snackBar.open('Le fournisseur ' + provider.name + ' a été créé.', 'OK', {
      duration: 3000,
    });
  }

  correspondenceSetted(provider: Provider){
    this._snackBar.open('Les correspondances de ' + provider.name + ' ont étées mises à jour !', 'OK', {
      duration: 4000,
    });
  }

  editedProvider(){
    this._snackBar.open('Les informations du fournisseur ont étées mises à jour !', 'OK', {
      duration: 3000,
    });
  }

  deleteProvider(provider:Provider){
    this._snackBar.open('Le fournisseur ' + provider.name + ' a été supprimé.', 'OK', {
      duration: 3000,
    });
  }
}
