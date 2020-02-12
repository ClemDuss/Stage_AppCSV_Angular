import { Component, OnInit } from '@angular/core';

import { ProvidersService } from '../../shared/services/providers.service';
import { Router } from '@angular/router';

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
  ) {}

  ngOnInit(): void {
  }

  onSubmit(){
    var provider = new Provider();
    provider.name = this.providerName;
    provider.file = this.providerFile;
    this.providersService.addProvider(provider)
    this.router.navigate(['new/correspondence']);
  }

  cancelAddProvider(){
    this.goToHome();
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
