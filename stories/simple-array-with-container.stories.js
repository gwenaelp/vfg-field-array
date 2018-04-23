import { storiesOf } from "@storybook/vue";
import Container from "./Container";
import Vue from "vue";

Vue.component("Container", Container);

// Add more stories here to live develop your components
storiesOf("2- Containers", module).add("Simple array with container", () => {
  return {
    data: function() {
      return {
        model: {
          array: []
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
      };
    },

    template: `
      <div>
        <h1>Form</h1>
        <vue-form-generator :schema="schema" :model="model"></vue-form-generator>
        <h1>Generated Value</h1>
        <pre>{{model.array}}</pre>
        <h1>Schema</h1>
        <pre>{{schema}}</pre>
      </div>
    `
  };
});
