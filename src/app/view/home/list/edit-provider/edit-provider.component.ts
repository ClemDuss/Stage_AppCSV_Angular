import { Component, OnInit } from '@angular/core';

import { DialogsService } from 'src/app/shared/services/dialogs.service';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.css']
})
export class EditProviderComponent implements OnInit {
  content = "Modifier";

  constructor(
    private dialogsService: DialogsService,
  ) { }

  ngOnInit(): void {
  }

  edit(){
    this.dialogsService.openEditProviderDialog();
  }

}
