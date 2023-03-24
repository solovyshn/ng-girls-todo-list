import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { InputButtonUnitComponent } from '../input-button-unit/input-button-unit.component';

@Component({
  selector: 'app-todo-item',
  template: `
    <div class="todo-item">
      <div>
        <input type="checkbox"
                class="todo-checkbox"
                (click)="completeItem()"
                [checked]="item.completed"/>
                <span class="todo-title"
                      [ngClass]="{'todo-complete': item.completed}"
                      (click)="showEditor()"
                      >
                  {{ item.title }}
                </span>
                <div class='btnEditorr' #btnEditor>
                  <app-input-button-unit ></app-input-button-unit>
                </div>
      </div>

      <button class="btn btn-red"
          (click)="removeItem()">
          remove
      </button>
    </div>
    <div class="steps" #Steps>

        <ul>
          <li *ngFor="let todoItem of stepsList">
            <!-- <app-todo-item [item]="todoItem"></app-todo-item> -->
            {{todoItem.title}}
          </li>
        </ul>

    </div>
  `,
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() item: TodoItem;
  @Output() remove: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('Steps') steps:ElementRef;
  @ViewChild('btnEditor') btnEditor:ElementRef;
  stepsList = [
    {title: 'start'},
    {title: 'end'},
  ];
  constructor(){
  }
  ngOnInit(): void {
  }
  removeItem(): void {
    this.remove.emit(this.item);
  }
  completeItem(): void {
    this.update.emit({
      item: this.item,
      changes: {completed: !this.item.completed}
    });
  }
  showSteps(): void{
    this.steps.nativeElement.style.visibility == "hidden" || this.steps.nativeElement.style.visibility == ""
      ? this.steps.nativeElement.style.visibility = "visible"
      : this.steps.nativeElement.style.visibility = "hidden"
    this.steps.nativeElement.style.display == "none" || this.steps.nativeElement.style.display == ""
      ? this.steps.nativeElement.style.display = "inline"
      : this.steps.nativeElement.style.display = "none"
  }
  showEditor(): void{
    this.btnEditor.nativeElement.style.visibility == "hidden" || this.btnEditor.nativeElement.style.visibility == ""
      ? this.btnEditor.nativeElement.style.visibility = "visible"
      : this.showSteps()
    if(this.btnEditor.nativeElement.style.display == "none" || this.btnEditor.nativeElement.style.display == ""){
      this.btnEditor.nativeElement.style.display = "inline"
    }
  }
}
