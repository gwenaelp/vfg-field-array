import { storiesOf } from "@storybook/vue";
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";

Vue.component("fieldCheck", {
  mixins: [VueFormGenerator.abstractField],
  template: `<span>
    <select v-model="value">
      <option :value="null">Please select one</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
    </select>
  </span>`
});

// Add more stories here to live develop your components
storiesOf("3- Advanced", module).add("showEmptyComponentAtBottom", () => {
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
              showEmptyComponentAtBottom: true,
              removeUndefinedValues: true,
              hideAddButton: true,
              items: {
                type: "check"
              }
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
