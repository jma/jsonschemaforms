import { Component, OnInit } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-array-type',
  template: `
    <!-- array title only if the array is empty -->
    <label *ngIf="to.label && formControl.length === 0">
      <!-- add button only if the max is not reached -->
      <button
        *ngIf="canAdd()"
        (click)="add(0)"
        class="btn btn-light bg-white mr-2"
      >
        <i class="fa fa-plus"></i>
      </button>
      <span [tooltip]="to.description">{{ to.label }}</span>
    </label>

    <!--  validation error message -->
    <div
      class="alert alert-danger"
      role="alert"
      *ngIf="showError && formControl.errors"
    >
      <formly-validation-message [field]="field"></formly-validation-message>
    </div>

    <!-- for each item -->
    <ng-container *ngFor="let field of field.fieldGroup; let i = index">
      <!-- put title with menu section for item object -->
      <div *ngIf="isChildrenObject()">
        <app-dropdown-label-editor
          [field]="field"
          [canAdd]="canAdd()"
          (addClicked)="add(0)"
        >
        <a class="dropdown-item disabled" href="/cataloging/help" translate>
          Help
        </a>
        </app-dropdown-label-editor>

        <!--  object validation error message -->
        <div
          class="alert alert-danger"
          role="alert"
          *ngIf="field.options.showError && field.formControl.errors"
        >
          <formly-validation-message
            [field]="field"
          ></formly-validation-message>
        </div>
      </div>
      <!-- all kind of item -->
      <div
        class="d-flex mb-2"
        [ngClass]="{ 'pl-4 object-block': isChildrenObject() }"
      >
        <!-- add button -->
        <button
          *ngIf="!isChildrenObject() && canAdd()"
          (click)="add(0)"
          class="btn btn-light bg-white mr-2"
        >
          <i class="fa fa-plus"></i>
        </button>
        <!-- item itself -->
        <div class="flex-grow-1">
          <formly-field [field]="field"></formly-field>
        </div>
        <!-- remove button -->
        <button
          (click)="remove(i)"
          *ngIf="canRemove()"
          class="btn btn-light bg-white"
          [ngClass]="{ 'mb-2': isChildrenObject() }"
        >
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </ng-container>
  `,
  styles: [
    `
      .object-block {
        border-left: 2px solid #ddd;
      }
    `
  ]
})
export class ArrayTypeComponent extends FieldArrayType implements OnInit {
  ngOnInit() {
    // this.field.templateOptions.parent = this;
    console.log('onInit');
    // setTimeout(() => { this.add(0);});
  }

  canAdd() {
    // console.log(this.field.templateOptions.required);
    const maxItems = this.field.templateOptions.maxItems;
    if (maxItems === undefined) {
      return true;
    }
    return this.field.fieldGroup.length < maxItems;
  }

  canRemove() {
    const minItems = this.field.templateOptions.minItems;
    if (minItems === undefined) {
      return true;
    }
    return this.field.fieldGroup.length > minItems;
  }

  add(i: number) {
    super.add(0, []);
    // this.field.fieldGroup[this.field.fieldGroup.length - 1].focus = true;
    console.log('add', this);
  }

  isChildrenObject() {
    // return true;
    return this.field.fieldArray.type === 'object';
  }

  hide() {
    this.field.hide = true;
    for (let i = 0; i < this.formControl.length; i++) {
      this.remove(0);
    }
  }
}
