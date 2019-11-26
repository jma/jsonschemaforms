import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-dropdown-label-editor',
  templateUrl: './dropdown-label-editor.component.html',
})
export class DropdownLabelEditorComponent {
  @Input()
  field: FormlyFieldConfig;

  @Input()
  canAdd: boolean;

  @Output() addClicked = new EventEmitter<boolean>();

  addClick(event) {
    this.addClicked.emit(event);
  }

}
