<template>
  <div :id="fieldId" :class="schema.fieldClasses" v-if="schema">
    <div v-for="(item, index) in value" :class="schema.itemContainerClasses">
      <span v-if="schema.items && schema.itemContainerComponent">
        <component
          :is='schema.itemContainerComponent'
          :model='item'
          :index="index"
          :id="fieldId + 'c' + index"
          :parentId="fieldId"
          :removeElementButtonLabel="removeElementButtonLabel"
          :moveElementUpButtonLabel="moveElementUpButtonLabel"
          :moveElementDownButtonLabel="moveElementDownButtonLabel"
          :itemContainerHeader="schema.itemContainerHeader"
          :schema='generateSchema(value, schema.items, index)'
          :vfg='vfg'
          @moveItemUp="moveElementUp(index)"
          @moveItemDown="moveElementDown(index)"
          @removeItem='removeElement(index)'>
          <component
            :is='getFieldType(schema.items)'
            :model='item'
            :schema='generateSchema(value, schema.items, index)'
            :vfg='vfg'
            :formOptions='formOptions'
            @model-updated='modelUpdated'/>
        </component>
      </span>
      <span v-else-if="schema.items">
        <component
          :is='getFieldType(schema.items)'
          :model='item'
          :schema='generateSchema(value, schema.items, index)'
          :vfg='vfg'
          :formOptions='formOptions'
          @model-updated='modelUpdated'/>
      </span>
      <span v-else-if="schema.itemContainerComponent">
        <component
          :is='schema.itemContainerComponent'
          :model='item'
          :index="index"
          :id="fieldId + 'c' + index"
          :parentId="fieldId"
          :removeElementButtonLabel="removeElementButtonLabel"
          :moveElementUpButtonLabel="moveElementUpButtonLabel"
          :moveElementDownButtonLabel="moveElementDownButtonLabel"
          :itemContainerHeader="schema.itemContainerHeader"
          :schema='generateSchema(value, schema.items, index)'
          :vfg='vfg'
          @moveItemUp="moveElementUp(index)"
          @moveItemDown="moveElementDown(index)"
          @removeItem='removeElement(index)'>
          <input type="text" v-model="value[index]" :class="schema.itemFieldClasses" :name='generateInputName(index)' :id="fieldId + index" />
          <input
            type="button"
            :value="removeElementButtonLabel"
            @click="removeElement(index)"
            v-if='schema.showRemoveButton'/>
        </component>
      </span>
      <input type="text" v-model="value[index]" :class="schema.itemFieldClasses" :name='generateInputName(index)' :id="fieldId + index" v-else/>
      <input
        type="button"
        :value="moveElementUpButtonLabel"
        :class="schema.moveElementUpButtonClasses"
        @click="moveElementUp(index)"
        v-if='schema.showModeElementUpButton'/>
      <input
        type="button"
        :value="moveElementDownButtonLabel"
        :class="schema.moveElementDownButtonClasses"
        @click="moveElementDown(index)"
        v-if='schema.showModeElementDownButton'/>
      <input
        type="button"
        :value="removeElementButtonLabel"
        :class="schema.removeElementButtonClasses"
        @click="removeElement(index)"
        v-if='schema.showRemoveButton'/>
    </div>
    <component
      v-if="schema.showEmptyComponentAtBottom"
      :is='getFieldType(schema.items)'
      :model='newItem'
      :schema='generateSchema(this, schema.items, "newItem")'
      :vfg='vfg'
      :formOptions='formOptions'
      @model-updated='emptyComponentModelUpdated'/>
    <input v-if="!schema.hideAddButton" type="button" :value="newElementButtonLabel" :class="schema.newElementButtonLabelClasses" @click="newElement"/>
  </div>
</template>

<script>
  import VueFormGenerator from "vue-form-generator";
  import isFunction from "lodash.isfunction";
  import isArray from "lodash.isarray";
  import isString from "lodash.isstring";

  import forEach from "lodash.foreach";
  import cloneDeep from "lodash.clonedeep";
  import Vue from "vue";

  export default {
    mixins: [VueFormGenerator.abstractField],
    data() {
      return {
        newItem: undefined
      };
    },
    computed: {
      fieldId() {
        return this.getFieldID(this.schema);
      },
      newElementButtonLabel() {
        if (typeof this.schema.newElementButtonLabel !== "undefined") {
          return this.schema.newElementButtonLabel;
        }

        return "+ New";
      },
      removeElementButtonLabel() {
        if (typeof this.schema.removeElementButtonLabel !== "undefined") {
          return this.schema.removeElementButtonLabel;
        }

        return "x";
      },
      moveElementUpButtonLabel() {
        if (typeof this.schema.moveElementUpButtonLabel !== "undefined") {
          removeElementButtonLabel();
          return this.schema.moveElementUpButtonLabel;
        }

        return "↑";
      },
      moveElementDownButtonLabel() {
        if (typeof this.schema.moveElementDownButtonLabel !== "undefined") {
          return this.schema.moveElementDownButtonLabel;
        }

        return "↓";
      }
    },
    watch: {
      value: {
        handler(v) {
          if (
            this.schema.removeUndefinedValues &&
            v !== undefined &&
            (v.indexOf(undefined) !== -1 || v.indexOf(null) !== -1)
          ) {
            const newValue = [...v];
            let index;
            console.log(newValue.indexOf(undefined), newValue.indexOf(null));
            while (newValue.indexOf(undefined) !== -1) {
              newValue.splice(newValue.indexOf(undefined), 1);
            }
            while (newValue.indexOf(null) !== -1) {
              newValue.splice(newValue.indexOf(null), 1);
            }
            this.value = newValue;
          }
        },
        deep: true
      }
    },
    methods: {
      generateSchema(rootValue, schema, index) {
        let newSchema = { ...schema };

        if (typeof this.schema.inputName !== "undefined") {
          newSchema.inputName = this.schema.inputName + "[" + index + "]";
        }

        newSchema.id = this.fieldId + index;

        return {
          ...newSchema,
          set(model, value) {
            Vue.set(rootValue, index, value);
          },
          get(model) {
            return rootValue[index];
          }
        };
      },
      generateInputName(index) {
        if (typeof this.schema.inputName === "undefined") {
          return null;
        }

        return this.schema.inputName + "[" + index + "]";
      },
      emptyComponentModelUpdated(e) {
        if (!this.value) {
          this.value = [];
        }
        this.value.push(e);
        this.newItem = undefined;
      },
      newElement() {
        let value = this.value;
        let itemsDefaultValue = undefined;

        if (!value || !value.push) value = [];

        if (this.schema.items && this.schema.items.default) {
          itemsDefaultValue = cloneDeep(this.schema.items.default);
        }

        value.push(itemsDefaultValue);

        this.value = [...value];
      },
      removeElement(index) {
        this.value.splice(index, 1);
      },
      moveElementDown(index) {
        let to = index + 1;
        if (to >= this.value.length) {
          to = 0;
        }
        this.value.splice(to, 0, this.value.splice(index, 1)[0]);
      },
      moveElementUp(index) {
        let to = index - 1;
        if (to < 0) {
          to = this.value.length;
        }
        this.value.splice(to, 0, this.value.splice(index, 1)[0]);
      },
      getFieldType(fieldSchema) {
        return "field-" + fieldSchema.type;
      },
      modelUpdated() {},
      validate(calledParent) {
        this.clearValidationErrors();
        let validateAsync = this.formOptions.validateAsync || false;
        let results = [];

        forEach(this.$children, child => {
          if (isFunction(child.validate)) {
            results.push(child.validate(true));
          }
        });

        let handleErrors = errors => {
          let fieldErrors = [];
          let errorPrepend =
            "[" +
            (this.schema.label ? this.schema.label : this.schema.name) +
            "] ";
          forEach(errors, err => {
            if (isArray(err) && err.length > 0) {
              forEach(err, singleErr => {
                fieldErrors.push(errorPrepend + singleErr);
              });
            } else if (isString(err)) {
              fieldErrors.push(errorPrepend + err);
            }
          });
          if (isFunction(this.schema.onValidated)) {
            this.schema.onValidated.call(
              this,
              this.model,
              fieldErrors,
              this.schema
            );
          }

          let isValid = fieldErrors.length == 0;
          if (!calledParent) {
            this.$emit("validated", isValid, fieldErrors, this);
          }
          this.errors = fieldErrors;
          return fieldErrors;
        };

        if (!validateAsync) {
          return handleErrors(results);
        }

        return Promise.all(results).then(handleErrors);
      }
    }
  };
</script>
