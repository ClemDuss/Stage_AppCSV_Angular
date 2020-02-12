import { Component, OnInit } from '@angular/core';

import { ProvidersService } from '../../../shared/services/providers.service';

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent implements OnInit {
  content = "Ajouter un fournisseur";

  constructor(
    private providersService: ProvidersService,
  ) { }

  ngOnInit(): void {
  }

}
