import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProvidersService } from '../../services/providers.service';
import { CsvService } from '../../services/csv.service';

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

  constructor(
    private providersService: ProvidersService,
    private csvService: CsvService,
    private router: Router,
  ) { 
    this.headerOptions = csvService.getHeadLine(providersService.getSelectedProvider());
    this.categs.push('EAN', 'Prix d\'ahcat', 'Description', 'Famille d\'article');
    console.log('fournisseur : ', providersService.providers[providersService.selectedProviderIndex]);
    console.log('nom : ', providersService.providers[providersService.selectedProviderIndex].name);
    console.log('correspondance : ', providersService.providers[providersService.selectedProviderIndex].correspondence);
    if(providersService.getCorrespondence() != null){
      this.selected = providersService.getCorrespondence();
      console.log('hello');
    }else{
      this.selected = [];
    }
  }

  ngOnInit(): void {
  }

  onSubmit(){
    //si la troisième valeur n'est pas renseignée, le tableau n sortie sera ["2", "4", empty, "37"]
    //si les deux dernières valeurs ne sont pas renseignées, le retour sera ["2", "4"]
    this.providersService.setCorrespondence(this.selected);
    this.goToHome();
  }

  goToHome(){
    this.router.navigate(['']);
  }

}
