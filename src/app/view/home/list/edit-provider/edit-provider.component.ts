import { Component, OnInit } from '@angular/core';

import { ProvidersService } from '../../../../shared/services/providers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.css']
})
export class EditProviderComponent implements OnInit {
  content = "Modifier";

  constructor(
    private providersService: ProvidersService,
    private router : Router,
  ) { }

  ngOnInit(): void {
  }

  edit(){
    this.router.navigate(['edit']);
  }

}
