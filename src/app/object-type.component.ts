import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-object-type',
  template: `
    <!-- main title -->
    <ng-container *ngIf="isRoot()">
      <ng-container
        *ngTemplateOutlet="legend; context: { $implicit: to }"
      ></ng-container>
    </ng-container>
    <!--  validation error message -->
    <div
      class="alert alert-danger"
      role="alert"
      *ngIf="showError && formControl.errors"
    >
      <formly-validation-message [field]="field"></formly-validation-message>
    </div>

    <!-- each object properties -->
    <div *ngFor="let f of field.fieldGroup" class="mb-2">
      <!-- if the field is repeatable the title is done by the corresponding array -->
      <ng-container
        *ngIf="
          !f.hide &&
          ((!isParrentArray() && f.type === 'object') || f.type === 'array')
        "
      >
        <app-dropdown-label-editor [field]="f" [canAdd]="false">
          <a class="dropdown-item disabled" href="/cataloging/help" translate>
            Help
          </a>
        </app-dropdown-label-editor>
      </ng-container>
      <div
        class="d-flex pl-4"
        [ngClass]="{ 'object-block': f.type === 'object' }"
      >
        <div class="flex-grow-1">
          <formly-field [field]="f"></formly-field>
        </div>
        <ng-container
          *ngTemplateOutlet="hideButton; context: { $implicit: f }"
        ></ng-container>
      </div>
    </div>

    <!-- legend -->
    <ng-template #legend let-to>
      <legend>
        <span [tooltip]="to.description">{{ to.label }}</span>
      </legend>
    </ng-template>

    <!-- tash button -->
    <ng-template #hideButton let-f>
      <button
        (click)="hide(f)"
        *ngIf="canHide(f) && !isRoot()"
        class="btn btn-light bg-white"
      >
        <i class="fa fa-trash"></i>
      </button>
    </ng-template>
  `,
  styles: [
    `
      .object-block {
        border-left: 2px solid #ddd;
      }
    `
  ]
})
export class ObjectTypeComponent extends FieldType {
  defaultOptions = {
    defaultValue: {}
  };

  isParrentArray() {
    return this.field.parent.type === 'array';
  }

  isChildenObject(field) {
    return field.type === 'object';
  }

  isRoot() {
    return this.field.parent.parent === undefined;
  }
  hide(field: FormlyFieldConfig) {
    field.hide = true;
  }
  canHide(field: FormlyFieldConfig) {
    return !field.templateOptions.required && !field.hide;
  }
}
