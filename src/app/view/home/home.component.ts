import { Component, OnInit } from '@angular/core';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { CsvService } from 'src/app/shared/services/csv.service';
import { SnackbarsService } from 'src/app/shared/services/snackbars.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public addProviderBtn_icon: string = 'add';
  public addProviderBtn_content: string = 'Ajouter un fournisseur';
  public exportBtn_content: string = 'Exporter le CSV';
  public exportBtn_icon: string = 'save_alt';

  constructor(
    private _dialogsService: DialogsService,
    private _csvService: CsvService,
    private _snackbarsService: SnackbarsService,
  ) { }

  ngOnInit(): void {
  }

  public addProviderBtn_click(): void{
    this._dialogsService.openNewProviderDialog();
  }

  public exportBtn_click(): void{
    if(this._csvService.everyFilesExists()){
      this._dialogsService.openExportDialog();
      this._csvService.exportFinalCSV();
    }else{
      this._snackbarsService.snackbar('Un des fournisseurs à exporter ne contient pas de fichier valide !');
    }
  }

}
