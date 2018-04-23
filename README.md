# vfg-field-array

![Rollup badge](https://img.shields.io/badge/Rollup-^0.53.3-ff69b4.svg)
![Jest](https://img.shields.io/badge/Jest-^22.0.4-blue.svg)
![Vue](https://img.shields.io/badge/Vue-^2.5.13-brightgreen.svg)
![Storybook](https://img.shields.io/badge/Storybook-^3.3.3-ff70a3.svg)
![Commitizen](https://img.shields.io/badge/Commitizen-enabled-brightgreen.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![Npm badge](https://img.shields.io/npm/v/vfg-field-array.svg)
[![Build Status](https://travis-ci.org/gwenaelp/vfg-field-array.svg?branch=master)](https://travis-ci.org/gwenaelp/vfg-field-array)

> A vue-form-generator field to handle arrays

> Generated using [vue-cli-template-library](https://github.com/julon/vue-cli-template-library).

## Examples

### Simple array

![Simple](https://github.com/gwenaelp/vfg-field-array/blob/master/docs/preview-simple.png)

```
{
  model: {
    array: ["item1", "item2", "item3"]
  },
  schema: {
    fields: [
      {
        type: "array",
        label: "Array field",
        model: "array",
        showRemoveButton: true
      }
    ]
  }
}
```

### With container component

![With container](https://github.com/gwenaelp/vfg-field-array/blob/master/docs/preview-container.png)

```
{
  model: {
    array: ["item1", "item2", "item3"]
  },
  schema: {
    fields: [
      {
        type: "array",
        label: "Array field",
        model: "array",
        itemContainerComponent: "Container"
      }
    ]
  }
}
```

#### Container.vue
```
<template>
  <div>
    <div>
      <div class="title">
        <a @click="contentVisible = !contentVisible">
          {{contentVisible ? "-" : "+"}} Container ({{model}})
        </a>
        <a @click="$emit('removeItem')">
          X
        </a>
      </div>
      <div class="content" v-if="contentVisible">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["model"],
    data() {
      return {
        contentVisible: false
      };
    }
  };
</script>
<style scoped>
  .title { background: whitesmoke; }
  .content { border: 2px solid whitesmoke; padding: 10px; }
  a { color: blue; text-decoration: underline; }
</style>
```

### With container component and object as array item

![With container and object](https://github.com/gwenaelp/vfg-field-array/blob/master/docs/preview-container-object.png)

```
{
  model: {
    columns: [{
      "label": "Name",
      "field": "full_name",
      "template": ""
    }, {
      "label": "URL",
      "field": "html_url",
      "template": ""
    }, {
      "label": "Date",
      "field": "date",
      "template": ""
    }],
  },
  schema: {
    type: 'array',
    label: 'Columns',
    model: 'columns',
    itemContainerComponent: 'WidgetListColumnEditorContainer',
    showRemoveButton: false,
    fieldClasses: 'arrayEditor',
    newElementButtonLabelClasses: "button is-primary",
    items: {
      type: 'object',
      default: {},
      schema: {
        fields: [{
          type: 'input',
          inputType: 'text',
          label: 'Label',
          model: 'label',
        },{
          type: 'input',
          inputType: 'text',
          label: 'Field',
          model: 'field',
        },{
          type: 'sourcecode',
          label: 'Template',
          model: 'template',
        }]
      }
    }
  }
}
```

### With bootstrap 4 container component, object as array item, validation and inputName
```
model: {
  columns: {}
},
schema: {
  fields:[
    {
      type: "array",
      label: 'Columns',
      model: 'columns',
      inputName: "columns",
      showRemoveButton: false,
      newElementButtonLabelClasses: "btn btn-outline-dark mt-2",
      itemContainerComponent: "field-array-bootstrap-accordion-item",
      newElementButtonLabel: "+ Add Column",
      itemContainerHeader: function(model, schema, index) {
        return "Column " + (index + 1) + (model && model.label ? " (" + model.label + ")": "");
      },
      items:{
        type: 'object',
        schema: {
          fields: [
              {
                  type: "input",
                  inputType: "text",
                  label: "Name",
                  model: "name",
                  inputName: "name",
                  required: true,
                  validator: "string",
              },
              {
                  type: "input",
                  inputType: "text",
                  label: "Description",
                  model: "description",
                  inputName: "description",
                  validator: "string"
              },
              {
                  type: "select",
                  label: "Field Type",
                  model: "type",
                  inputName: "type",
                  required: true,
                  validator: "string",
                  values: [
                      {id: "string", name: "Text Field"},
                      {id: "text", name: "Text Area"},
                      {id: "number", name: "Number"},
                      {id: "date", name: "Date"},
                      {id: "select", name: "Single selection"},
                      {id: "multiselect", name: "Multiple Selection"},
                      {id: "boolean", name: "True/False"}
                  ]
              },
              {
                  type: "array",
                  label: "Values",
                  model: "values",
                  inputName: "values",
                  validator: "array",
                  showRemoveButton: true,
                  showModeElementUpButton: true,
                  showModeElementDownButton: true,
                  itemFieldClasses: "form-control",
                  itemContainerClasses: "input-group pb-2",
                  newElementButtonLabelClasses: "btn btn-outline-dark",
                  removeElementButtonClasses: "btn btn-danger input-group-append",
                  moveElementUpButtonClasses: "btn btn-outline-dark input-group-append",
                  moveElementDownButtonClasses: "btn btn-outline-dark input-group-append",
                  newElementButtonLabel: "+ Add Value",
                  visible: function(model) {
                      return model && (model.type === "select" || model.type === "multiselect");
                  },
                  required: function(model) {
                      return model && (model.type === "select" || model.type === "multiselect");
                  }
              },
              {
                  type: "input",
                  inputType: "number",
                  label: "Rows (optional)",
                  model: "rows",
                  inputName: "rows",
                  validator: "integer",
                  visible: function(model) {
                      return model && model.type === "text";
                  }
              }
            ]
        }
      }
    }
  ]

},
formOptions: {
  validateAfterChanged: true
}
```

## Installation
```
npm install vfg-field-array
```
vfg-field-array can be used as a module in both CommonJS and ES modular environments.

When in non-modular environment, vfg-field-array will register all the components to vue by itself.</p>

### ES6
```js
//
// You can register a component manually
//
import { FieldArray } from 'vfg-field-array';

export default {
  ...
  components: {
    FieldArray
  },
  ...
};

//
// or register the whole module with vue
//
import ModuleLibrary from 'vfg-field-array';

// Install this library
Vue.use(ModuleLibrary);
```

### CommonJS
```js
//
// You can register a component manually
//
var Vue = require('vue');
var ModuleLibrary = require('vfg-field-array');

var YourComponent = Vue.extend({
  ...
  components: {
    'field-array': ModuleLibrary.FieldArray
  },
  ...
});

//
// or register the whole module with vue
//
var Vue = require('vue');
var ModuleLibrary = require('vfg-field-array');

// Install this library
Vue.use(ModuleLibrary);
```

### Browser

```html
<script src="path/to/vue/vue.min.js"></script>
<script src="path/to/vfg-field-array/dist/vfg-field-array.min.js"></script>
<!-- Components are registered globally -->
```

### After that, you can use it with Vue Form Generator:

```json
  schema: {
    fields: [
      {
        type: "array",
        label: "My array",
        model: "myArray"
      }
    ]
  }
```


## Changelog

See the GitHub [release history](https://github.com/gwenaelp/vfg-field-array/releases).

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md).
