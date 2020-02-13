import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProvidersService } from '../../shared/services/providers.service';

import { Provider } from '../../shared/models/provider';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  addProviderContentButton = 'Valider les modifications';
  cancelContentButton = 'Annuler';

  nameLabel = 'Nom du fournisseur';
  fileLabel = 'Fichier fournisseur';
  nameId = 'providerName';
  fileId = 'providerFile';

  provider = new Provider();

  providerName : string;
  providerFile : File;

  constructor(
    private providersService : ProvidersService,
    private router : Router,
  ) { 
    this.provider = this.providersService.getSelectedProvider();
    this.providerName = this.provider.name;
    this.providerFile = this.provider.file;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    var provider = new Provider();
    provider.name = this.providerName;
    this.providersService.editProvider(provider)
    this.goToHome();
  }

  cancelEditProvider(){
      this.goToHome();
  }

  goToHome(){
    this.router.navigate(['']);
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
