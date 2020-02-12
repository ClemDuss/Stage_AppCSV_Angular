import { Component, OnInit } from '@angular/core';

import { ProvidersService } from '../../../../shared/services/providers.service';

@Component({
  selector: 'app-place-provider-before',
  templateUrl: './place-provider-before.component.html',
  styleUrls: ['./place-provider-before.component.css']
})
export class PlaceProviderBeforeComponent implements OnInit {
  icon = "keyboard_arrow_up";

  constructor(
    private providerService: ProvidersService,
  ) { }

  ngOnInit(): void {
  }

  move(){
    this.providerService.moveProviderUp();
  }

}
