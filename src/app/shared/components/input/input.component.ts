import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() public type: string = 'text';
  @Input() public name: string;
  @Input() public label: string;
  @Input() public id: string;
  @Input() public change: string;
  @Input() public required : true | false = false;
  @Input() public accept: string;
  @Input() public inputModel: string;
  @Output() public inputModelChange: EventEmitter<string> = new EventEmitter<string>();

  public inputControl = new FormControl('', [
    Validators.required,
  ]);

  public matcher = new MyErrorStateMatcher();

  constructor() { }

  ngOnInit(): void {
  }

}
