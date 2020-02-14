import { Component, OnInit } from '@angular/core';

import { DialogsService } from 'src/app/shared/services/dialogs.service';

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent implements OnInit {
  content = "Ajouter un fournisseur";

  constructor(
    private dialogsService: DialogsService,
  ) { }

  ngOnInit(): void {
  }

  openDialog(){
    this.dialogsService.openNewProviderDialog();
  }

}
