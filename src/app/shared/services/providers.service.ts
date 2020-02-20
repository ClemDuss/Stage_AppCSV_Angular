import { Injectable } from '@angular/core';

import { Provider } from '../models/provider';
import { SnackbarsService } from './snackbars.service';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  providers: Array<Provider>;
  selectedProviderIndex;

  constructor(
    private snackBarService: SnackbarsService,
  ) { 
    if(localStorage.getItem("Providers") != null){
      this.providers = this.getLocalStorageProviders();
    }else{
      this.providers = new Array<Provider>();
      var provider = new Provider('Four 1');
      this.providers.push(provider);
    }
    if(localStorage.getItem("SelectedIndex") != null){
      this.selectedProviderIndex = this.getLocalStorageSelectedIndex();
    }else{
      this.selectedProviderIndex = -1;
    }
  }

  getLocalStorageProviders(){
    let newProviders : Array<Provider> = new Array<Provider>();
    for(let i=0; i<localStorage.getItem("Providers").length-1; i++){
      let provider = new Provider();
      let jsonProvider = JSON.parse(localStorage.getItem("Providers"))[i];
      if(jsonProvider != undefined){
        provider.name = jsonProvider.name;
        provider.file = jsonProvider.file;
        provider.correspondence = jsonProvider.correspondence;
        provider.toExport = jsonProvider.toExport;
        newProviders.push(provider);
      }
    }
    return newProviders;
  }

  setLocalStorageProviders(){
    let jsonArray = [];
    this.providers.forEach(provider=>{
      //jsonArray.push({name: provider.name, file: toBase64String(provider.file)})
    });
    localStorage.setItem("Providers", JSON.stringify(this.providers));
    console.log(JSON.stringify(this.providers));
  }

  getLocalStorageSelectedIndex(){
    return parseInt(localStorage.getItem("SelectedIndex"));
  }

  setLocalStorageSelectedIndex(){
    localStorage.setItem("SelectedIndex", this.selectedProviderIndex.toString());
  }

  getProviderActionVisible(){
    if(this.selectedProviderIndex > -1){
      return true;
    }
    return false;
  }

  resetSelectedIndex(){
    this.selectedProviderIndex = -1;
    this.setLocalStorageSelectedIndex();
  }

  setSelectedIndex(action){
    if(action == 'up'){
      if(this.selectedProviderIndex<this.providers.length-1){
        this.selectedProviderIndex++;
      }
    }else if(action == 'down'){
      if(this.selectedProviderIndex>0){
        this.selectedProviderIndex--;
      }
    }
  }

  addProvider(provider : Provider){
    var newProviders = [];
    for(let i=0; i<this.providers.length; i++){
      newProviders.push(this.providers[i]);
    }
    newProviders.push(provider);
    this.providers = newProviders;
    this.selectedProviderIndex = this.providers.length-1;
    this.setLocalStorageProviders();
    this.snackBarService.providerAdded(provider);
  }

  deleteProvider(){
    var newProviders = [];
    let deletedProvider;
    for(let i=0; i<this.providers.length; i++){
      if(i != this.selectedProviderIndex){
        newProviders.push(this.providers[i]);
      }else{
        deletedProvider = this.providers[i];
      }
    }
    this.providers = newProviders;

    this.selectedProviderIndex = -1;
    this.setLocalStorageProviders();
    this.setLocalStorageSelectedIndex();

    this.snackBarService.deleteProvider(deletedProvider);
  }

  editProvider(editedProvider : Provider){
    var newProviders = [];
    for(var i=0; i<this.providers.length; i++){
      if(i!=this.selectedProviderIndex){
        newProviders.push(this.providers[i]);
      }else{
        newProviders.push(editedProvider);
      }
    }
    this.providers = newProviders;
    this.snackBarService.editedProvider();
  }

  clickCheckProvider(){
    if(this.providers[this.selectedProviderIndex].toExport){
      this.providers[this.selectedProviderIndex].toExport = false;
    }else{
      this.providers[this.selectedProviderIndex].toExport = true;
    }
    this.setLocalStorageProviders();
  }

  getToExport() : boolean{
    if(this.selectedProviderIndex > -1){
      return this.providers[this.selectedProviderIndex].toExport;
    }else{
      return false;
    }
  }
  
  setCorrespondence(correspondenceArray){
    this.providers[this.selectedProviderIndex].correspondence = correspondenceArray;
    this.setLocalStorageProviders();
    this.snackBarService.correspondenceSetted(this.providers[this.selectedProviderIndex]);
  }

  getCorrespondence(){
    console.log(this.providers);
    return this.providers[this.selectedProviderIndex].correspondence;
  }

  isFielExists(providerIndex){
    if(this.providers[providerIndex].file != null && typeof this.providers[providerIndex].file.name == 'string'){
      return 'check_circle_outline';
    }else{
      return 'not_interested';
    }
  }

  moveProviderUp(){
    if(this.selectedProviderIndex > 0 && this.selectedProviderIndex < this.providers.length){
      var newProviders = [];
      var previousProvider = this.getProvider(this.selectedProviderIndex-1);
      var actualProvider = this.getProvider(this.selectedProviderIndex);

      for(var i=0; i<this.providers.length; i++){
        if(i == this.selectedProviderIndex-1){
          newProviders.push(actualProvider);
        }else if(i == this.selectedProviderIndex){
          newProviders.push(previousProvider);
        }else{
          newProviders.push(this.providers[i]);
        }
      }
      this.providers = newProviders;
      this.selectedProviderIndex--;
      this.setLocalStorageProviders();
      this.setLocalStorageSelectedIndex();
    }
  }

  moveProviderDown(){
    if(this.selectedProviderIndex > -1 && this.selectedProviderIndex < this.providers.length-1){
      var newProviders = [];
      var previousProvider = this.getProvider(this.selectedProviderIndex+1);
      var actualProvider = this.getProvider(this.selectedProviderIndex);

      for(var i=0; i<this.providers.length; i++){
        if(i == this.selectedProviderIndex){
          newProviders.push(previousProvider);
        }else if(i == this.selectedProviderIndex+1){
          newProviders.push(actualProvider);
        }else{
          newProviders.push(this.providers[i]);
        }
      }
      this.providers = newProviders;
      this.selectedProviderIndex++;
      this.setLocalStorageProviders();
      this.setLocalStorageSelectedIndex();
    }
  }

  getProviders(){
    return this.providers;
  }

  getProvider(index){
    return this.providers[index];
  }

  setSelectedProvider(index){
    this.selectedProviderIndex = index;
    this.setLocalStorageSelectedIndex();
    console.log(this.providers[index]);
  }

  getSelectedProvider() : Provider{
    if(this.selectedProviderIndex > -1){
      return this.providers[this.selectedProviderIndex];
    }else{
      return new Provider();
    }
  }

  getSelectedProviderIndex(){
    return this.selectedProviderIndex;
  }
}
