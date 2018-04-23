import { storiesOf } from "@storybook/vue";

// Add more stories here to live develop your components
storiesOf("1- FieldArray", module).add("Remove button", () => {
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
              showRemoveButton: true
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
