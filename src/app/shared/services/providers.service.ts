import { Injectable } from '@angular/core';

import { Provider } from '../models/provider';
import { SnackbarsService } from './snackbars.service';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  public providers: Array<Provider>;
  private _selectedProviderIndex: number;

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
      this._selectedProviderIndex = this.getLocalStorageSelectedIndex();
    }else{
      this._selectedProviderIndex = -1;
    }
  }

  /**
   * Retourne la liste de fournisseurs de localStorage
   */
  private getLocalStorageProviders(): Array<Provider>{
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

  /**
   * Met à jour la liste de fournisseurs de localStorage
   */
  private setLocalStorageProviders(): void{
    let jsonArray = [];
    this.providers.forEach(provider=>{
      //jsonArray.push({name: provider.name, file: toBase64String(provider.file)})
    });
    localStorage.setItem("Providers", JSON.stringify(this.providers));
    console.log(JSON.stringify(this.providers));
  }

  /**
   * Retourne la valeur de l'index sélectionné de localStorage
   */
  private getLocalStorageSelectedIndex(): number{
    return parseInt(localStorage.getItem("SelectedIndex"));
  }

  /**
   * Met à jour la valeur de l'index sélectionné de localStorage
   */
  private setLocalStorageSelectedIndex(): void{
    localStorage.setItem("SelectedIndex", this._selectedProviderIndex.toString());
  }

  /**
   * Retourne vrai si un fournisseur est sélectionné
   * Cela afin de permettre l'affichage des actions associées (tel que modif, delete, ..)
   */
  public getProviderActionVisible(): boolean{
    if(this._selectedProviderIndex > -1){
      return true;
    }
    return false;
  }

  /**
   * Met l'index du fournisseur sélectionné à -1
   * Cela permet de ne plus avoir de fournisseurs sélectionné (lors d'une suppression par exemple)
   */
  public resetSelectedIndex(): void{
    this._selectedProviderIndex = -1;
    this.setLocalStorageSelectedIndex();
  }

  /**
   * Augmente ou diminu de 1 l'index sélectionné (lors du déplacement d'un fournisseur dans la liste)
   * @param action Action à effectuer sur l'index
   */
  private setSelectedIndex(action: 'up' | 'down'): void{
    if(action == 'up'){
      if(this._selectedProviderIndex<this.providers.length-1){
        this._selectedProviderIndex++;
      }
    }else if(action == 'down'){
      if(this._selectedProviderIndex>0){
        this._selectedProviderIndex--;
      }
    }
  }

  /**
   * Ajoute un fournisseur à la liste des Fournisseurs
   * @param provider Fournisseru à ajouter
   */
  public addProvider(provider : Provider): void{
    var newProviders = [];
    for(let i=0; i<this.providers.length; i++){
      newProviders.push(this.providers[i]);
    }
    newProviders.push(provider);
    this.providers = newProviders;
    this._selectedProviderIndex = this.providers.length-1;
    this.setLocalStorageProviders();
    this.snackBarService.providerAdded(provider);
  }

  /**
   * Supprime le fournisseurs à l'index du selectedProviderIndex
   */
  public deleteProvider(): void{
    var newProviders = [];
    let deletedProvider;
    for(let i=0; i<this.providers.length; i++){
      if(i != this._selectedProviderIndex){
        newProviders.push(this.providers[i]);
      }else{
        deletedProvider = this.providers[i];
      }
    }
    this.providers = newProviders;

    this._selectedProviderIndex = -1;
    this.setLocalStorageProviders();
    this.setLocalStorageSelectedIndex();

    this.snackBarService.deleteProvider(deletedProvider);
  }

  /**
   * Met à jour les informations du fournisseurs sélectionné
   * @param editedProvider Fournisseur à modifier
   */
  public editProvider(editedProvider : Provider): void{
    var newProviders = [];
    for(var i=0; i<this.providers.length; i++){
      if(i!=this._selectedProviderIndex){
        newProviders.push(this.providers[i]);
      }else{
        newProviders.push(editedProvider);
      }
    }
    this.providers = newProviders;
    this.snackBarService.editedProvider();
  }

  /**
   * Switch pour la valeur toExport du fournisseur sélectionné
   */
  public clickCheckProvider(): void{
    if(this.providers[this._selectedProviderIndex].toExport){
      this.providers[this._selectedProviderIndex].toExport = false;
    }else{
      this.providers[this._selectedProviderIndex].toExport = true;
    }
    this.setLocalStorageProviders();
  }

  /**
   * Retourne la valeur toExport du fournisseur sélectioné
   */
  public getToExport() : boolean{
    if(this._selectedProviderIndex > -1){
      return this.providers[this._selectedProviderIndex].toExport;
    }else{
      return false;
    }
  }
  
  /**
   * Met à jour le tableau de correspondance du fournisseur sélectionné
   * @param correspondenceArray Tableau de correspondance
   */
  public setCorrespondence(correspondenceArray): void{
    this.providers[this._selectedProviderIndex].correspondence = correspondenceArray;
    this.setLocalStorageProviders();
    this.snackBarService.correspondenceSetted(this.providers[this._selectedProviderIndex]);
  }

  /**
   * Retourne le tableau de correspondance du fournisseur sélectionné
   */
  public getCorrespondence(): number[]{
    console.log(this.providers);
    return this.providers[this._selectedProviderIndex].correspondence;
  }

  /**
   * Retourne l'icon en fonction de l'existance ou non du fichier fournisseur
   * @param providerIndex Index du fournisseur
   */
  public isFielExists(providerIndex): string{
    if(this.providers[providerIndex].file != null && typeof this.providers[providerIndex].file.name == 'string'){
      return 'check_circle_outline';
    }else{
      return 'not_interested';
    }
  }

  /**
   * Déplace le fournisseur d'un cran vers le haut dans la liste
   */
  public moveProviderUp(): void{
    if(this._selectedProviderIndex > 0 && this._selectedProviderIndex < this.providers.length){
      var newProviders = [];
      var previousProvider = this.getProvider(this._selectedProviderIndex-1);
      var actualProvider = this.getProvider(this._selectedProviderIndex);

      for(var i=0; i<this.providers.length; i++){
        if(i == this._selectedProviderIndex-1){
          newProviders.push(actualProvider);
        }else if(i == this._selectedProviderIndex){
          newProviders.push(previousProvider);
        }else{
          newProviders.push(this.providers[i]);
        }
      }
      this.providers = newProviders;
      this._selectedProviderIndex--;
      this.setLocalStorageProviders();
      this.setLocalStorageSelectedIndex();
    }
  }

  /**
   * Déplace le fournisseur d'un cran vers le haut dans la liste
   */
  public moveProviderDown(): void{
    if(this._selectedProviderIndex > -1 && this._selectedProviderIndex < this.providers.length-1){
      var newProviders = [];
      var previousProvider = this.getProvider(this._selectedProviderIndex+1);
      var actualProvider = this.getProvider(this._selectedProviderIndex);

      for(var i=0; i<this.providers.length; i++){
        if(i == this._selectedProviderIndex){
          newProviders.push(previousProvider);
        }else if(i == this._selectedProviderIndex+1){
          newProviders.push(actualProvider);
        }else{
          newProviders.push(this.providers[i]);
        }
      }
      this.providers = newProviders;
      this._selectedProviderIndex++;
      this.setLocalStorageProviders();
      this.setLocalStorageSelectedIndex();
    }
  }

  /**
   * Retourne la liste de fournisseurs
   */
  public getProviders(): Array<Provider>{
    return this.providers;
  }

  /**
   * Retourne le fournisseur de la lista à l'index renseigné
   * @param index Index du fournisseur désiré
   */
  public getProvider(index): Provider{
    return this.providers[index];
  }

  /**
   * Met à jour la valeur de l'index sélectionné
   * @param index Index du fournisseur
   */
  public setSelectedProvider(index): void{
    this._selectedProviderIndex = index;
    this.setLocalStorageSelectedIndex();
    console.log(this.providers[index]);
  }

  /**
   * Retourne le fournisseur sélectionné
   */
  public getSelectedProvider() : Provider{
    if(this._selectedProviderIndex > -1){
      return this.providers[this._selectedProviderIndex];
    }else{
      return new Provider();
    }
  }

  /**
   * Retourne l'index du fournisseur sélectionné
   */
  public getSelectedProviderIndex(): number{
    return this._selectedProviderIndex;
  }
}
