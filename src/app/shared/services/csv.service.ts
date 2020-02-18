import { Injectable } from '@angular/core';

import { ProvidersService } from './providers.service';

import { Provider } from '../models/provider';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  providers: Array<Provider>;
  categoryNamesList;
  totalProvidersList;

  constructor(
    private providersService : ProvidersService,
  ) {
    this.providers = this.providersService.providers;
  }

  exportCSV(){
    for(let i=0; i<this.providersService.providers.length; i++){
      let headerOptions;
      headerOptions = this.getHeadLine(this.providersService.providers[i]);
      console.log(headerOptions);
    }
  }

  getHeadLine(provider: Provider) : any[] {
    let file = provider.file;
    if(file){
      var reader = new FileReader();
      reader.readAsText(file);
      let headerArray = [];  

      reader.onload= () =>{
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headers = (<string>csvRecordsArray[0]).split(';');  
        for (let j = 0; j < headers.length; j++) {  
          headerArray.push(headers[j]);  
        }
      };

      reader.onerror = function(){
      };
      
      return headerArray;
    }
  }

  exportFinalCSV(){
    this.providers = this.providersService.providers;
    //this.exportArticles(this.exportProviders(), this.exportCategoryNames());
    this.exportProviders();
    this.exportCategoryNames();
  }

  exportArticles(providersList, categoryList){
    let articleNumber = 1;
    let providerNumber = 0;
    let fileName = 'Articles';
    let downloadElementId = 'articles';
    let fileContent = 'code_article;code_fournisseur;code_famille_article;Description;EAN;Prix_Achat\n';

    this.initFile(fileContent, fileName, downloadElementId);
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
                  if(ean == "" || typeof Number(ean) != "number"){
                    ean = articleCode;
                  }
                  let prixAchat = csvRecordsArray[j].split(';')[this.providers[i].correspondence[1]];
                  let description = csvRecordsArray[j].split(';')[this.providers[i].correspondence[2]];
                  fileContent += articleCode + ';' + providerCode + ';' + categoryCode + ';' + description + ';' + ean + ';' + prixAchat + '\n';
                  articleNumber++;
                }
              }
            };

            readers[i].onloadend=()=>{
              this.appendFile(fileContent, downloadElementId);
              providerNumber++;
              console.log(providerNumber + '|' + numberToExport);
              if(providerNumber == numberToExport){
                this.downloadFile(downloadElementId);
              }
            };
          }
        }
      }
    }
  }

  exportCategoryNames(){
    let categoryList = [];
    categoryList.push({code:'FAR00000', name:'Famille Incounnue'});
    let categNumber = 1;
    let providerNumber = 0;
    let downloadElementId = 'categoryNames';
    let fileName = 'Familles_Articles';
    let fileContent = 'ID_Famille_Article;Nom_Famille_Article\n';
    fileContent += categoryList[0].code + ';' + categoryList[0].name + '\n';

    this.initFile(fileContent, fileName, downloadElementId);
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
                      categNumber++;
                    }
                  }
                }
              }
            };

            readers[i].onloadend=()=>{
              this.appendFile(fileContent, downloadElementId);
              providerNumber++;
              if(providerNumber == numberToExport){
                this.downloadFile(downloadElementId);
                this.categoryNamesList = categoryList;
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

  exportProviders(){
    let providersList = []
    let fileName = 'Fournisseurs';
    let fileContent = 'Fournisseur_ID;Nom_Fournisseur\n';

    for(let i=0; i<this.providers.length; i++){
      if(this.providers[i].toExport){
        let providerCode = this.generateProviderCode(i+1)
        let providerName = this.providers[i].name;
        fileContent += providerCode + ';' + providerName + '\n';
        providersList.push({code: providerCode, name: providerName});
      }
    }

    this.createFile(fileContent, fileName);

    this.totalProvidersList = providersList;
    //return providersList;
  }

  initFile(headLine, fileTitle, elementId){
    var element = document.createElement('a');
    element.setAttribute('id', elementId);
    element.setAttribute('download', fileTitle + '.csv');

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(headLine));

    element.style.display = 'block';
    document.body.appendChild(element);
  }

  appendFile(fileContentToAdd, elementId){
    var element = document.getElementById(elementId);
    let content = element.getAttribute('href');
    content += encodeURIComponent(fileContentToAdd);
    element.setAttribute('href', content);
  }

  downloadFile(elementId){
    var element = document.getElementById(elementId);

    console.log(element.getAttribute('href'));
    console.log(element);
    element.click();

    document.body.removeChild(element);
  }

  createFile(fileContent, fileTitle){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
    element.setAttribute('download', fileTitle + '.csv');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  generateProviderCode(nb): string{
    let providerCode;
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

  generateCategoryCode(nb): string{
    let categoryCode;
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

  generateArticleCode(nb): string{
    let articleCode;
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

  encode_utf8(s) {
    //return encodeURIComponent(s);
    return unescape(encodeURIComponent(s));
  }
  
  decode_utf8(s) {
    //return decodeURIComponent(escape(s));
    return decodeURIComponent(s);
  }
}
