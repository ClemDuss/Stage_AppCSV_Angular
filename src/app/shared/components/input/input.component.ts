import { Component, OnInit } from '@angular/core';

import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() type = 'text';
  @Input() name;
  @Input() label;
  @Input() id;
  @Input() change;
  @Input() accept;
  @Input() inputModel: string;
  @Output() inputModelChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
