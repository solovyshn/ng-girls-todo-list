import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-button-unit',
  template: `
    <input #inputElementRef
          [value]="title"
          (keyup.enter)="changeTitle(inputElementRef)">

    <button (click)="changeTitle(inputElementRef)">
      Save
    </button>
  `,
  styleUrls: ['./input-button-unit.component.scss']
})
export class InputButtonUnitComponent implements OnInit {
  title = 'Hello World';

  constructor() { }

  ngOnInit(): void {
  }

  changeTitle(inputElementReference): void {
    console.log(inputElementReference)
    this.title = inputElementReference.value;
  }
}
