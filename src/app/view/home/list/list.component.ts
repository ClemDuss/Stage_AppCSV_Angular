import { Component, OnInit } from '@angular/core';

import { ProvidersService } from '../../../shared/services/providers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    public providersService : ProvidersService,
  ) {}

  ngOnInit(): void {
  }

}
