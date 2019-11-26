import {
  Component,
  ɵSWITCH_COMPILE_INJECTABLE__POST_R3__
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { JSONSchema7 } from 'json-schema';

function orderedJsonSchema(schema) {
  if (schema.properties) {
    if (schema.propertiesOrder) {
      schema._properties = { ...schema.properties };
      schema.properties = {};
      for (const property of schema.propertiesOrder) {
        schema.properties[property] = schema._properties[property];
      }
    }
    for (const property of Object.keys(schema.properties)) {
      orderedJsonSchema(schema.properties[property]);
    }
  }
  if (schema.items) {
    orderedJsonSchema(schema.items);
  }
  return schema;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  model: any;
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];

  type: string;
  schema: any = {
    title: 'Test editor',
    description: 'description',
    type: 'object',
    required: ['title', 'authors'],
    propertiesOrder: [
      'types',
      'title',
      'authors',
      'collation',
      'notes',
      'address',
      'private',
      'object1',
      'nested'
    ],
    properties: {
      object1: {
        type: 'object',
        title: 'object1',
        description: 'description',
        properties: {
          object2: {
            type: 'object',
            description: 'description',
            title: 'object2',
            properties: {
              value1: {
                type: 'string',
                description: 'description',
                title: 'value1'
              },
              value2: {
                type: 'string',
                description: 'description',
                title: 'value2'
              }
            }
          }
        }
      },
      collation: {
        type: 'object',
        description: 'description',
        title: 'collation',
        properties: {
          pages: {
            type: 'string',
            description: 'description',
            title: 'pages'
          },
          dimensions: {
            type: 'string',
            description: 'description',
            title: 'dimensions'
          }
        }
      },
      nested: {
        type: 'object',
        description: 'description',
        title: 'nested',
        properties: {
          level1: {
            type: 'array',
            description: 'description',
            title: 'level1',
            items: {
              type: 'object',
              description: 'description',
              title: 'level11',
              properties: {
                level2: {
                  type: 'array',
                  description: 'description',
                  title: 'level2',
                  items: {
                    type: 'object',
                    description: 'description',
                    title: 'level21',
                    properties: {
                      value1: {
                        type: 'string',
                        description: 'description',
                        title: 'value1'
                      },
                      value2: {
                        type: 'string',
                        description: 'description',
                        title: 'value2'
                      }
                    }
                  }
                }
              }
            }
          },
          rlevel1: {
            type: 'array',
            description: 'description',
            title: 'rlevel1',
            items: {
              type: 'string',
              description: 'description',
              title: 'rvalue'
            }
          }
        }
      },
      description: 'description',
      title: {
        title: 'Title',
        description: 'un super titre',
        type: 'string',
        form: {
          placeholder: 'please enter a title',
          focus: true
        }
      },
      notes: {
        title: 'Notes',
        description: 'description',
        type: 'array',
        items: {
          type: 'string',
          description: 'description',
          title: 'note',
          minLength: 3,
          form: {
            placeholder: 'please enter a new note'
          }
        }
      },
      address: {
        description: 'description',
        title: 'Addresses',
        type: 'array',
        items: {
          description: 'description',
          title: 'address',
          type: 'object',
          // propertiesOrder: ['city', 'street'],
          properties: {
            street: {
              description: 'description',
              title: 'street',
              type: 'string'
            },
            city: {
              type: 'array',
              description: 'description',
              title: 'cities',
              items: {
                description: 'description',
                title: 'city',
                type: 'string'
              }
            }
          }
        }
      },
      private: {
        description: 'description',
        title: 'Private',
        type: 'string',
        default: 'private',
        readOnly: true,
        minLength: 3,
        form: {
          placeholder: 'please enter a street'
        }
      },
      hidden: {
        description: 'description',
        title: 'Hidden field',
        type: 'string',
        form: {
          hide: true
        }
      },
      authors: {
        type: 'array',
        minItems: 1,
        maxItems: 3,
        description: 'description',
        title: 'Authors',
        items: {
          type: 'object',
          description: 'description',
          title: 'author',
          properties: {
            first_name: {
              description: 'description',
              title: 'last name',
              type: 'string',
              minLength: 3
            },
            last_name: {
              description: 'description',
              title: 'first name',
              type: 'string',
              minLength: 3
            }
          }
        }
      },
      types: {
        type: 'string',
        description: 'description',
        title: 'Types',
        default: 'book',
        enum: ['book', 'report']
      }
    }
  };

  constructor(private formlyJsonschema: FormlyJsonschema) {
    this.schema = orderedJsonSchema(this.schema);
    this.form = new FormGroup({});
    // this.form.valueChanges.subscribe(x => console.log(x, this.form, this.model));
    this.options = {};
    this.fields = [
      formlyJsonschema.toFieldConfig(this.schema, {
        map: (field: FormlyFieldConfig, mapSource: JSONSchema7) => {
          // console.log(field, mapSource);
          const formOptions = mapSource.form;
          if (formOptions) {
            if (formOptions.hide === true) {
              // redefine the field
              field.hide = true;
            }
            if (formOptions.focus === true) {
              // redefine the field
              field.focus = true;
            }
            if (formOptions.placeholder) {
              // redefine the field
              field.templateOptions.placeholder = formOptions.placeholder;
            }
          }
          if (mapSource.type === 'string') {
            field.wrappers = ['form-field-horizontal'];
          }
          // if (mapSource.type === 'array') {
          //   if (field.validators && field.validators.minItems) {
          //     field.validators.minItems = ({ value }) => {
          //       return true;
          //     };
          //   }
          // }
          // console.log(field, mapSource);
          // console.log(field.templateOptions.description);
          return field;
        }
      })
    ];
    // console.log(this.fields, this.form);
    this.model = {
      // description: 'description',
      title: 'test'
    };
  }

  submit(model) {
    console.log(model, this.model);
  }
}
