import { storiesOf } from "@storybook/vue";
import BootstrapAccordionContainer from "./bootstrap-accordion-container";
import Vue from "vue";

Vue.component(
  "field-array-bootstrap-accordion-item",
  BootstrapAccordionContainer
);

// Add more stories here to live develop your components
storiesOf("2- Containers", module).add("Bootstrap accordion container", () => {
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
              label: "Columns",
              model: "columns",
              inputName: "columns",
              showRemoveButton: false,
              newElementButtonLabelClasses: "btn btn-outline-dark mt-2",
              itemContainerComponent: "field-array-bootstrap-accordion-item",
              newElementButtonLabel: "+ Add Column",
              itemContainerHeader: function(model, schema, index) {
                return (
                  "Column " +
                  (index + 1) +
                  (model && model.label ? " (" + model.label + ")" : "")
                );
              },
              items: {
                type: "input",
                inputType: "text",
                label: "Description",
                model: "description",
                inputName: "description",
                validator: "string"
              }
            }
          ]
        }
      };
    },

    template: `
    <div>
    <h1>Warning</h1>
    This story is a work in progress and lacks some integration of jquery and bootstrap.
    <h1>Form</h1>
    <vue-form-generator :schema="schema" :model="model"></vue-form-generator>
    <h1>Generated Value</h1>
    <pre>{{model.array}}</pre>
    <h1>Schema</h1>
    <pre>{{schema}}</pre>
    <h1>Container component</h1>
      <pre>&#x3C;template&#x3E;
      &#x3C;div&#x3E;
          &#x3C;div class=&#x22;card&#x22;&#x3E;
              &#x3C;div class=&#x22;card-header&#x22; :id=&#x22;&#x27;heading&#x27; + id&#x22; :class=&#x22;{&#x27;bg-danger&#x27;: hasError}&#x22;&#x3E;
                  &#x3C;h5 class=&#x22;mb-0&#x22;&#x3E;
                      &#x3C;a data-toggle=&#x22;collapse&#x22; :data-target=&#x22;&#x27;#collapse&#x27; + id&#x22; aria-expanded=&#x22;false&#x22; :aria-controls=&#x22;&#x27;collapse&#x27; + id&#x22;&#x3E;
                          {{ headerText }}
                      &#x3C;/a&#x3E;
                      &#x3C;input type=&#x22;button&#x22; class=&#x22;btn btn-danger btn-sm float-right&#x22; @click=&#x22;$emit(&#x27;removeItem&#x27;)&#x22; :value=&#x22;removeElementButtonLabel&#x22; /&#x3E;
                      &#x3C;input type=&#x22;button&#x22; class=&#x22;btn btn-outline-dark btn-sm float-right mr-1&#x22; @click=&#x22;moveItem(&#x27;moveItemDown&#x27;)&#x22; :value=&#x22;moveElementDownButtonLabel&#x22; /&#x3E;
                      &#x3C;input type=&#x22;button&#x22; class=&#x22;btn btn-outline-dark btn-sm float-right mr-1&#x22; @click=&#x22;moveItem(&#x27;moveItemUp&#x27;)&#x22; :value=&#x22;moveElementUpButtonLabel&#x22; /&#x3E;
                  &#x3C;/h5&#x3E;
              &#x3C;/div&#x3E;

              &#x3C;div :id=&#x22;&#x27;collapse&#x27; + id&#x22; class=&#x22;collapse&#x22; :aria-labelledby=&#x22;&#x27;heading&#x27; + id&#x22; :data-parent=&#x22;&#x27;#&#x27;+parentId&#x22; &#x3E;
                  &#x3C;div class=&#x22;card-body&#x22;&#x3E;
                      &#x3C;slot&#x3E;&#x3C;/slot&#x3E;
                  &#x3C;/div&#x3E;
              &#x3C;/div&#x3E;
          &#x3C;/div&#x3E;
      &#x3C;/div&#x3E;
  &#x3C;/template&#x3E;

  &#x3C;script&#x3E;
      export default {
        name: &#x22;FieldArrayBootstrapAccordionItem&#x22;,
        props: [
          &#x22;model&#x22;,
          &#x22;index&#x22;,
          &#x22;schema&#x22;,
          &#x22;id&#x22;,
          &#x22;parentId&#x22;,
          &#x22;removeElementButtonLabel&#x22;,
          &#x22;moveElementDownButtonLabel&#x22;,
          &#x22;moveElementUpButtonLabel&#x22;,
          &#x22;itemContainerHeader&#x22;
        ],
        data() {
          return {
            hasError: false
          };
        },
        computed: {
          headerText() {
            if (typeof this.itemContainerHeader === &#x22;function&#x22;) {
              return this.itemContainerHeader(this.model, this.schema, this.index);
            } else if (typeof this.itemContainerHeader !== &#x22;undefined&#x22;) {
              return typeof this.itemContainerHeader;
            }

            return &#x22;Field &#x22; + (this.index + 1);
          }
        },
        methods: {
          validate(calledParent) {
            if (this.$children.length &#x3C; 1) {
              console.warn(
                &#x22;The accordion item of the array field seam to be empty. Could not validate&#x22;
              );
              return false;
            }

            return this.$children[0].validate(calledParent);
          },
          validated(isValid, errors) {
            this.hasError = !isValid;
          },
          moveItem(direction) {
            $(&#x22;#collapse&#x22; + this.id).collapse(&#x22;hide&#x22;);
            this.$emit(direction);
          }
        },
        mounted() {
          if (
            !this.$slots.default ||
            typeof this.$slots.default[0] !== &#x22;object&#x22; ||
            typeof this.$slots.default[0].componentInstance !== &#x22;object&#x22; ||
            typeof this.$slots.default[0].componentInstance.$on !== &#x22;function&#x22;
          ) {
            return;
          }

          this.$slots.default[0].componentInstance.$on(&#x22;validated&#x22;, this.validated);
        }
      };
  &#x3C;/script&#x3E;

  &#x3C;style scoped&#x3E;

  &#x3C;/style&#x3E;
    </pre>
    </div>
    `
  };
});
