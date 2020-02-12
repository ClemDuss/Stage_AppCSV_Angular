import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() content : string;
  @Input() type : string;
  @Input() icon : string;
  @Output() clickCusto = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

}
