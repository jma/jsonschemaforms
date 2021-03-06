import { Component } from '@angular/core';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-array-type',
  templateUrl: 'array-type.component.html'
})
export class ArrayTypeComponent extends FieldArrayType {
  /**
   * Is a new element can be added?
   * @returns boolean, true if a new element can be inserted in the array
   */
  canAdd() {
    const maxItems = this.field.templateOptions.maxItems;
    if (maxItems === undefined) {
      return true;
    }
    return this.field.fieldGroup.length < maxItems;
  }

  /**
   * Is an element can be removed?
   * @returns boolean, true if an element ca be removed
   */
  canRemove() {
    const minItems = this.field.templateOptions.minItems;
    if (minItems === undefined) {
      return true;
    }
    return this.field.fieldGroup.length > minItems;
  }

  /**
   * Add a new element in the array
   * @param i - number, the position to add the element
   */
  add(i: number) {
    super.add(i);
    // TODO: focus in the first input child
    this.setFocusInChildren(this.field.fieldGroup[i]);
  }

  /**
   * Set the focus to the first non object, array in children
   * Recursive.
   * @param field - FormlyFieldConfig, configuration form
   */
  setFocusInChildren(field: FormlyFieldConfig) {
    if (field.fieldGroup && field.fieldGroup.length > 0) {
      for (const f of field.fieldGroup) {
        console.log(f);
        if (this.setFocusInChildren(f)) {
          return true;
        }
      }
      return false;
    }
    if (!field.hide) {
      field.focus = true;
      return true;
    }
    return false;
  }

  /**
   * Are the children of type object?
   */
  isChildrenObject() {
    return this.field.fieldArray.type === 'object';
  }

  /**
   * Hide the array and remove all the elements
   */
  hide() {
    this.field.hide = true;
    for (const f of this.field.fieldGroup) {
      this.remove(0);
    }
  }

  /**
   * Is the dropdown menu displayed?
   * @param field - FormlyFieldConfig, the correspondig form field config
   * @returns boolean, true if the menu should be displayed
   */
  hasMenu(field: FormlyFieldConfig) {
    return (
      (field.type === 'object' &&
        this.hiddenFieldGroup(field.fieldGroup).length > 0) ||
      field.templateOptions.helpURL
    );
  }

  /**
   * Filter the fieldGroup to return the list of hidden field.
   * @param fieldGroup - FormlyFieldConfig[], the fieldGroup to filter
   * @returns FormlyFieldConfig[], the filtered list
   */
  hiddenFieldGroup(fieldGroup: FormlyFieldConfig[]): FormlyFieldConfig[] {
    return fieldGroup.filter(f => f.hide && f.hideExpression == null);
  }
}
