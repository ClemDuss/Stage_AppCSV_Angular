import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { ProvidersService } from '../../shared/services/providers.service';
import { DialogsService } from 'src/app/shared/services/dialogs.service';

import { Provider } from '../../shared/models/provider';

@Component({
  selector: 'app-new-provider',
  templateUrl: './new-provider.component.html',
  styleUrls: ['./new-provider.component.css']
})
export class NewProviderComponent implements OnInit {
  public title: string = 'Ajouter un fournisseur';

  public validBtn_content: string = 'Ajouter';
  public cancelBtn_content: string = 'Annuler';

  public providerNameInput_label: string = 'Nom du fournisseur';
  public providerNameInput_id: string = 'providerName';
  public providerNameInput_name: string = 'providerName';
  public providerNameInput_value : string = '';

  public providerFileInput_label: string = 'Fichier fournisseur : ';
  public providerFileInput_id: string = 'providerFile';
  public providerFileInput_name: string = 'providerFile';
  public providerFileInput_accept: string = '.csv';
  public providerFileInput_value: File = null;

  constructor(
    private _providersService : ProvidersService,
    private _dialogsService: DialogsService,
    private _dialogRef: MatDialogRef<DialogsService>,
  ) {}

  ngOnInit(): void {
  }

  public validBtn_click(): void{
    let addingIsPossible = true;
    var provider = new Provider();
    provider.name = this.providerNameInput_value;
    provider.file = this.providerFileInput_value;

    if(provider.name == ""){
      addingIsPossible = false;
    }
    if(provider.file == undefined || provider.file.name.substr(provider.file.name.length-4, 4) != '.csv'){
      addingIsPossible = false;
    }

    if(addingIsPossible){
      this._providersService.addProvider(provider)
      this._dialogsService.openCorrespondenceDialog();
    }
  }

  public cancelBtn_click(): void{
    this._dialogRef.close();
  }

  updateFile(files:FileList = null): void{
    if(files[0].toString() != "$"){
      var file = files[0];
      if(file != null){
        this.providerFileInput_value = files[0];
      }
    }
  }

}
