import { Component, OnInit } from '@angular/core';

import { CsvService } from '../../../shared/services/csv.service';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { Subscription } from 'rxjs';
import { SnackbarsService } from 'src/app/shared/services/snackbars.service';

@Component({
  selector: 'app-create-csv',
  templateUrl: './create-csv.component.html',
  styleUrls: ['./create-csv.component.css']
})
export class CreateCsvComponent implements OnInit {
  content = "Exporter le CSV";

  constructor(
    private csvService: CsvService,
    private dialogsService: DialogsService,
    private snackbarsService: SnackbarsService,
  ) { }

  ngOnInit(): void {
  }

  export(){
    if(!this.csvService.aFileNotExist()){
      this.dialogsService.openExportDialog();
      this.csvService.exportFinalCSV();
    }else{
      this.snackbarsService.snackbar('Un des fournisseurs à exporter ne contient pas de fichier valide !');
    }
  }

}
