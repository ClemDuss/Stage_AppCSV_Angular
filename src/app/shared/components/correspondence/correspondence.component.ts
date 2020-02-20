import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { ProvidersService } from '../../services/providers.service';
import { DialogsService } from 'src/app/shared/services/dialogs.service';

import { CsvService } from '../../services/csv.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-correspondence',
  templateUrl: './correspondence.component.html',
  styleUrls: ['./correspondence.component.css']
})
export class CorrespondenceComponent implements OnInit {
  providers;
  headerOptions = [];
  selected;

  correspondence: []

  categs = [];

  loadFileProgression;
  subscribrLoadFileProgression: Subscription;

  constructor(
    private providersService: ProvidersService,
    public csvService: CsvService,
    private router: Router,
    private dialogsService: DialogsService,
    public dialogRef: MatDialogRef<DialogsService>,
  ) { 
    this.headerOptions = csvService.getHeadLine(providersService.getSelectedProvider());
    this.categs.push('EAN', 'Prix d\'ahcat', 'Description', 'Famille d\'article');
    if(providersService.getCorrespondence() != null){
      this.selected = providersService.getCorrespondence();
    }else{
      this.selected = [];
    }

    this.subscribrLoadFileProgression = csvService.getOpenFileProgression().subscribe((data)=>{
      this.loadFileProgression=data;
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    //si la troisième valeur n'est pas renseignée, le tableau n sortie sera ["2", "4", empty, "37"]
    //si les deux dernières valeurs ne sont pas renseignées, le retour sera ["2", "4"]
    this.providersService.setCorrespondence(this.selected);
    this.dialogRef.close();
  }

  goToHome(){
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.subscribrLoadFileProgression.unsubscribe;
  }

}
