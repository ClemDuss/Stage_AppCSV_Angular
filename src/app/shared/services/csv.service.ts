import { Injectable } from '@angular/core';

import { ProvidersService } from './providers.service';

import { Provider } from '../models/provider';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(
    private providersService : ProvidersService,
  ) { }

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
}
