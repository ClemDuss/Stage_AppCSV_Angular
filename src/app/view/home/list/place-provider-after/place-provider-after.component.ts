import { Component, OnInit } from '@angular/core';

import { ProvidersService } from '../../../../shared/services/providers.service';

@Component({
  selector: 'app-place-provider-after',
  templateUrl: './place-provider-after.component.html',
  styleUrls: ['./place-provider-after.component.css']
})
export class PlaceProviderAfterComponent implements OnInit {
  icon = 'keyboard_arrow_down';

  constructor(
    private providerService: ProvidersService,
  ) {}

  ngOnInit(): void {
  }

  move(){
    this.providerService.moveProviderDown();
  }

}
