import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  addProviderContentButton = 'Ajouter';
  cancelContentButton = 'Annuler';

  nameLabel = 'Nom du fournisseur';
  fileLabel = 'Fichier fournisseur';
  nameId = 'providerName';
  fileId = 'providerFile';

  myGroup;

  provider = new Provider();

  providerName = '';
  providerFile : File = null;

  constructor(
    private providersService : ProvidersService,
    private router: Router,
    private dialogsService: DialogsService,
    public dialogRef: MatDialogRef<DialogsService>,
  ) {}

  ngOnInit(): void {
  }

  onSubmit(){
    let addingIsPossible = true;
    var provider = new Provider();
    provider.name = this.providerName;
    provider.file = this.providerFile;

    if(provider.name == ""){
      addingIsPossible = false;
    }
    if(provider.file == undefined || provider.file.name.substr(provider.file.name.length-4, 4) != '.csv'){
      addingIsPossible = false;
    }

    if(addingIsPossible){
      this.providersService.addProvider(provider)
      this.dialogsService.openCorrespondenceDialog();
    }
  }

  cancelAddProvider(){
    this.dialogRef.close();
  }

  goToHome(){
    this.router.navigate(['']);
  }

  setProviderName(theName){
    this.provider.name = theName;
  }

  setProviderFile(theFile){
    this.provider.file = theFile;
  }

  updateFile(files:FileList = null){
    if(files[0].toString() != "$"){
      var file = files[0];
      if(file != null){
        this.providerFile = files[0];
      }
    }
  }

}
