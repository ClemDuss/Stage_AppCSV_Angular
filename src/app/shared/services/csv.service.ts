import { Injectable } from '@angular/core';

import { ProvidersService } from './providers.service';

import { Provider } from '../models/provider';
import { saveAs } from 'file-saver';
import { Subject, Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  providers: Array<Provider>;
  categoryNamesList;
  totalProvidersList;

  filesNames: any [];
  exportStatus = new Subject<any>();
  exportStates:[{name:string, state:string}];

  observableExportArticleDetailsState = new Subject<any>();
  exportArticleDetailsState: [{name: string, state: string}];

  isExportEnded = new Subject<boolean>();

  progressOpenFile = new Subject<number>();

  constructor(
    private providersService : ProvidersService,
  ) {
    this.providers = this.providersService.providers;
    this.filesNames = [];
    this.filesNames.push('Fournisseurs');
    this.filesNames.push("Familles_Articles");
    this.filesNames.push("Articles");

    this.isExportEnded.next(false);
    
    this.exportStates = [{name: '--', state: '--'}];
    this.filesNames.forEach(fileName => {
      this.exportStates.push({name:fileName, state: 'progress'})
    });
    this.exportStates.shift();
    this.exportStatus.next(this.exportStates);
  }

  public getOpenFileProgression(): Observable<number>{
    return this.progressOpenFile.asObservable();
  }

  public getExportFileStatus(): Observable<any>{
    return this.exportStatus.asObservable();
  }

  public getExportArticleDetailsState(): Observable<any>{
    return this.observableExportArticleDetailsState.asObservable();
  }

  public getIsExportEnded(): Observable<boolean>{
    return this.isExportEnded.asObservable();
  }

  /**
   * Remet à zéro les états d'exports des fichier
   */
  public resetExportStates(): void{
    this.exportStates.forEach(element => {
      element.state = 'progress';
    });
    this.exportArticleDetailsState.forEach(element => {
      element.state = 'progress';
    });
  }

  /**
   * Retourne un tableau contenant toutes les en-tête des colonnes du fichier fournisseur
   * @param provider Fournisseur dont on shouaite récupérer l'en-tête du fichier
   */
  public getHeadLine(provider: Provider) : any[] {
    let file = provider.file;
    this.progressOpenFile.next(0);
    if(file){
      let headerArray = [];  
      new Promise((resolve, reject)=>{
        var reader = new FileReader();
      
        reader.onprogress=(e)=>{
          this.progressOpenFile.next(e.loaded*100/e.total);
        };
        
        reader.onload= (e) =>{
          let csvData = reader.result;
          let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
  
          let headers = (<string>csvRecordsArray[0]).split(';');  
          for (let j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);  
          }
        };

        reader.onloadend=(e)=>{
          let csvData = reader.result;
          let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
          resolve(csvRecordsArray);
        };

        reader.readAsText(file);
      });
      return headerArray;
    }
  }

  /**
   * Retourne 'true' si au moins un des fournisseurs
   * à exporter ne contient pas de fichier.
   */
  public someFileNotExist() : boolean{
    this.providers = this.providersService.providers;
    let aFileIsUndefined: boolean = false;
    this.providers.forEach(prov => {
      if(prov.toExport){
        if(prov.file == undefined || prov.file.name == undefined){
          aFileIsUndefined = true;
        }
      }
    });
    return aFileIsUndefined;
  }

  /**
   * Action contraire de someFileNotExist()
   */
  public everyFilesExists(): boolean{
    return !this.someFileNotExist();
  }

  /**
   * Fonction a appeler depuis la vue pour réaliser l'export final.
   * Cette fonction s'occupe d'appeler les autres fonctions d'export pour chaque fichiers individuels.
   */
  public exportFinalCSV(): void{
    this.providers = this.providersService.providers;
    this.exportArticleDetailsState = [{name: '--', state: '--'}];
    this.providers.forEach(prov => {
      this.exportArticleDetailsState.push({name: prov.name, state: 'progress'});
    });
    this.exportArticleDetailsState.shift();
    this.observableExportArticleDetailsState.next(this.exportArticleDetailsState);

    this.exportProviders();
    this.exportCategoryNames();
  }

  /**
   * Fonction effectuant la création du fichier 'Articles.csv' et son export
   * @param providersList Liste des fournisseurs (à exporter)
   * @param categoryList Liste des familles d'articles
   */
  private exportArticles(providersList, categoryList): void{
    let articleNumber = 1;
    let providerNumber = 0;
    let fileName = 'Articles';
    let downloadElementId = 'articles';
    let fileContent = 'code_article;code_fournisseur;code_famille_article;Description;EAN;Prix_Achat;Reporter_PAnet_sur_PA;Fournisseur_Principal\n';
    let fileContentBlob = fileContent;
    let finalBlob: Blob;

    let readers: Array<FileReader> = [];

    let numberToExport = 0;
    this.providers.forEach(prov=>{
      if(prov.toExport){
        numberToExport++;
      }
    });

    for(let i=0; i<this.providers.length; i++){
      let providerCode;
      providersList.forEach(provider => {
        if(this.providers[i].name == provider.name){
          providerCode = provider.code;
        }
      });

      if(this.providers[i].toExport){
        if(typeof this.providers[i].file != undefined){
          let file = this.providers[i].file;
          if(file){
            readers[i] = new FileReader();
            readers[i].readAsText(file, 'utf-8');
            
            readers[i].onload=() =>{
              let csvData = readers[i].result;
              let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

              fileContent = '';

              for(let j = 1; j<csvRecordsArray.length; j++){
                if(j != csvRecordsArray.length - 1){
                  let articleCode = this.generateArticleCode(articleNumber);

                  let csvLine = csvRecordsArray[j].split(';');

                  let categoryName = csvRecordsArray[j].split(';')[this.providers[i].correspondence[3]];
                  let categoryCode = 'FAR00000';
                  categoryList.forEach(categ => {
                    if(categ.name == categoryName){
                      categoryCode = categ.code;
                    }
                  });

                  let ean = csvRecordsArray[j].split(';')[this.providers[i].correspondence[0]];
                  if(ean != '' && typeof Number(ean) == 'number'){
                    articleCode = ean;
                  }
                  if(ean == "" || typeof Number(ean) != "number"){
                    ean = "";
                  }
                  let prixAchat = csvRecordsArray[j].split(';')[this.providers[i].correspondence[1]];
                  prixAchat = prixAchat.replace('ï¿½', '');
                  prixAchat = prixAchat.replace('�', '');
                  prixAchat = prixAchat.replace('€', '');
                  prixAchat = prixAchat.replace('.', ',');
                  prixAchat = prixAchat.trim();
                  let description = csvRecordsArray[j].split(';')[this.providers[i].correspondence[2]];
                  if(description != ""){
                    fileContent += articleCode + ';' + providerCode + ';' + categoryCode + ';' + description + ';' + ean + ';' + prixAchat + ';1;1\n';
                    fileContentBlob += articleCode + ';' + providerCode + ';' + categoryCode + ';' + description + ';' + ean + ';' + prixAchat + ';1;1\n';
                    articleNumber++;
                  }
                }
              }
            };

            readers[i].onloadend=()=>{
              providerNumber++;
              this.exportArticleDetailsState.forEach(element => {
                if(element.name == this.providers[i].name){
                  element.state = 'done';
                }
              });
              this.observableExportArticleDetailsState.next(this.exportArticleDetailsState);
              if(providerNumber == numberToExport){
                finalBlob = new Blob([fileContentBlob], {
                  type: "text/plain;charset=utf-8"
                });
                this.exportStates.forEach(statu => {
                  if(statu.name == this.exportStates[0+2].name){
                    //l'index 2 correspond à l'état d'export du fichier Articles dans this.exportStates
                    //'0+2' car '2' posait problème
                    statu.state = 'done';
                  }
                });
                this.exportStatus.next(this.exportStates);
                saveAs(finalBlob, fileName+'.csv');

                this.isExportEnded.next(true);
              }
            };
          }
        }
      }
    }
  }

  /**
   * Fonction effectuant la création du fichier 'Familles_Articles.csv' et son export
   */
  private exportCategoryNames(): void{
    let categoryList = [];
    categoryList.push({code:'FAR00000', name:'Famille Incounnue'});
    let categNumber = 1;
    let providerNumber = 0;
    let downloadElementId = 'categoryNames';
    let fileName = 'Familles_Articles';
    let fileContent = 'ID_Famille_Article;Nom_Famille_Article\n';
    fileContent += categoryList[0].code + ';' + categoryList[0].name + '\n';
    let finalBlob : Blob;
    let fileContentBlob = fileContent;

    let readers: Array<FileReader> = [];

    let numberToExport = 0;
    this.providers.forEach(prov=>{
      if(prov.toExport){
        numberToExport++;
      }
    })

    for(let i=0; i<this.providers.length; i++){
      if(this.providers[i].toExport){
        if(typeof this.providers[i].file != undefined){
          let file = this.providers[i].file;
          if(file){
            readers[i] = new FileReader();
            readers[i].readAsText(file, 'utf-8');

            readers[i].onload= (e) =>{
              let csvData = readers[i].result;
              let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

              fileContent = '';
              let columnIndexCategoryName = this.providers[i].correspondence[3];

              for(let j = 1; j<csvRecordsArray.length; j++){
                if(j != csvRecordsArray.length - 1){
                  let alreadyInList:boolean = false;
                  let categoryName = csvRecordsArray[j].split(';')[columnIndexCategoryName];
                  if(categoryName != ""){
                    categoryList.forEach(category=>{
                      if(category.name == categoryName){
                        alreadyInList = true;
                      }
                    })
                    if(!alreadyInList){
                      let categoryCode = this.generateCategoryCode(categNumber);
                      categoryList.push({code: categoryCode, name: categoryName});
                      fileContent += categoryCode + ';' + categoryName + '\n';
                      fileContentBlob += categoryCode + ';' + categoryName + '\n';
                      categNumber++;
                    }
                  }
                }
              }
            };

            readers[i].onloadend=()=>{
              providerNumber++;
              if(providerNumber == numberToExport){
                this.categoryNamesList = categoryList;
                finalBlob = new Blob([fileContentBlob], {
                  type: "text/plain;charset=utf-8"
                });
                this.exportStates.forEach(statu => {
                  if(statu.name == this.exportStates[0+1].name){
                    //l'index 1 correspond à l'état d'export du fichier Familles dans this.exportStates
                    //'0+1' car '1' posait problème
                    statu.state = 'done';
                  }
                });
                this.exportStatus.next(this.exportStates);
                saveAs(finalBlob, fileName + '.csv');
                this.exportArticles(this.totalProvidersList, this.categoryNamesList);
              }
            };

            readers[i].onerror = function(){
              providerNumber++;
            };
          }
        }
      }
    }
  }

  /**
   * Fonction effectuant la création du fichier 'Fournisseurs.csv' et son export
   */
  private exportProviders(): void{
    let providersList = []
    let fileName = 'Fournisseurs';
    let fileContent = 'Fournisseur_ID;Nom_Fournisseur\n';
    let finalBlob : Blob;

    for(let i=0; i<this.providers.length; i++){
      if(this.providers[i].toExport){
        let providerCode = this.generateProviderCode(i+1)
        let providerName = this.providers[i].name;
        fileContent += providerCode + ';' + providerName + '\n';
        providersList.push({code: providerCode, name: providerName});
      }
    }
    
    finalBlob = new Blob([fileContent], {
      type: "text/plain;charset=utf-8"
    });
    this.exportStates.forEach(statu => {
      if(statu.name == this.exportStates[0].name){
        //l'index 0 correspond à l'état d'export du fichier fournisseurs dans this.exportStates
        statu.state = 'done';
      }
    });
    this.exportStatus.next(this.exportStates);

    saveAs(finalBlob, fileName + '.csv');

    this.totalProvidersList = providersList;
  }

  /**
   * Génère et retourne le code fournisseur
   * @param nb Numéro du fournisseur
   */
  private generateProviderCode(nb: number): string{
    let providerCode: string;
    if (nb < 10)
      providerCode = "FR0000" + nb;
    else if (nb < 100)
      providerCode = "FR000" + nb;
    else if (nb < 1000)
      providerCode = "FR00" + nb;
    else if (nb < 10000)
      providerCode = "FR0" + nb;
    else
      providerCode = "FR" + nb;
    return providerCode;
  }

  /**
   * Génère et retourne le code famille
   * @param nb Numéro de la famille article
   */
  private generateCategoryCode(nb: number): string{
    let categoryCode: string;
    if (nb < 10)
      categoryCode = "FAR0000" + nb;
    else if (nb < 100)
      categoryCode = "FAR000" + nb;
    else if (nb < 1000)
      categoryCode = "FAR00" + nb;
    else if (nb < 10000)
      categoryCode = "FAR0" + nb;
    else
      categoryCode = "FAR" + nb;
    return categoryCode;
  }

  /**
   * Génère et retourne le code article
   * @param nb Numéro de l'article
   */
  private generateArticleCode(nb: number): string{
    let articleCode: string;
    if (nb < 10)
      articleCode = "AR0000" + nb;
    else if (nb < 100)
      articleCode = "AR000" + nb;
    else if (nb < 1000)
      articleCode = "AR00" + nb;
    else if (nb < 10000)
      articleCode = "AR0" + nb;
    else
      articleCode = "AR" + nb;
    return articleCode;
  }
}
