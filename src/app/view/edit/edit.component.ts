import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

import { ProvidersService } from '../../shared/services/providers.service';
import { DialogsService } from 'src/app/shared/services/dialogs.service';

import { Provider } from '../../shared/models/provider';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public title: string = 'Modifier un fournisseur';

  public validBtn_content: string = 'Valider les modifications';
  public cancelBtn_content: string = 'Annuler';

  public providerNameInput_label: string = 'Nom du fournisseur';
  public providerNameInput_id: string = 'providerName';
  public providerNameInput_name: string = 'providerName';
  public providerNameInput_value : string;

  private _provider = new Provider();

  public providerFileInput_label: string = 'Fichier fournisseur : ';
  public providerFileInput_id: string = 'providerFile';
  public providerFileInput_name: string = 'providerFile';
  public providerFileInput_accept: string = '.csv';
  public providerFileInput_value: File;

  constructor(
    private _providersService : ProvidersService,
    private _dialogsService: DialogsService,
    private _dialogRef: MatDialogRef<DialogsService>,
  ) { 
    this._provider = this._providersService.getSelectedProvider();
    this.providerNameInput_value = this._provider.name;
    this.providerFileInput_value = this._provider.file;
  }

  ngOnInit(): void {
  }

  public validBtn_click(): void{
    let addingIsPossible = true;
    this._provider.name = this.providerNameInput_value;
    this._provider.file = this.providerFileInput_value;

    if(this._provider.name == ""){
      addingIsPossible = false;
    }
    if(this._provider.file == undefined || this._provider.file.name == undefined){
      addingIsPossible = false;
    }

    if(addingIsPossible){
      this._providersService.editProvider(this._provider)
      this._dialogsService.openCorrespondenceDialog();
    }
  }

  public cancelBtn_click(): void{
      this._dialogRef.close();
  }
  
  public updateFile(files:FileList = null): void{
    if(files[0].toString() != "$"){
      var file = files[0];
      if(file != null){
        this.providerFileInput_value = files[0];
      }
    }
  }

}
