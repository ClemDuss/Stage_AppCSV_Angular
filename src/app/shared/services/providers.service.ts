import { Injectable } from '@angular/core';

import { Provider } from '../models/provider';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  providers: Array<Provider>;
  selectedProviderIndex;

  constructor() { 
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
        newProviders.push(provider);
      }
    }
    return newProviders;
  }

  setLocalStorageProviders(){
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
    }else{
      return false;
    }
  }

  addProvider(provider : Provider){
    this.providers.push(provider);
    this.selectedProviderIndex = this.providers.length-1;
    this.setLocalStorageProviders();
  }

  deleteProvider(){
    var newProviders = [];
    for(let i=0; i<this.providers.length; i++){
      if(i != this.selectedProviderIndex){
        newProviders.push(this.providers[i]);
      }
    }
    this.providers = newProviders;

    this.selectedProviderIndex = -1;
    this.setLocalStorageProviders();
    this.setLocalStorageSelectedIndex();
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
  }
  
  setCorrespondence(correspondenceArray){
    this.providers[this.selectedProviderIndex].correspondence = correspondenceArray;
    this.setLocalStorageProviders();
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
