import { Component, OnInit } from '@angular/core';

import { ProvidersService } from '../../../../shared/services/providers.service';

@Component({
  selector: 'app-delete-provider',
  templateUrl: './delete-provider.component.html',
  styleUrls: ['./delete-provider.component.css']
})
export class DeleteProviderComponent implements OnInit {
  content = "Supprimer";

  constructor(
    private providersService: ProvidersService,
  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.providersService.deleteProvider();
  }

}
