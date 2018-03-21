<template>
  <div :id="getFieldID(schema)" :class="schema.fieldClasses" v-if="schema">
    <div v-for="(item, index) in value">
      <span v-if="schema.items && schema.itemContainerComponent">
        <component
          :is='schema.itemContainerComponent'
          :model='item'
          :schema='generateSchema(value, schema.items, index)'
          @removeItem='removeElement(index)'>
          <component
            :is='getFieldType(schema.items)'
            :model='item'
            :schema='generateSchema(value, schema.items, index)'
            :formOptions='formOptions'
            @model-updated='modelUpdated'/>
        </component>
      </span>
      <span v-else-if="schema.items">
        <component
          :is='getFieldType(schema.items)'
          :model='item'
          :schema='generateSchema(value, schema.items, index)'
          :formOptions='formOptions'
          @model-updated='modelUpdated'/>
      </span>
      <span v-else-if="schema.itemContainerComponent">
        <component
          :is='schema.itemContainerComponent'
          :model='item'
          :schema='generateSchema(value, schema.items, index)'
          @removeItem='removeElement(index)'>
          <input type="text" v-model="value[index]"/>
          <input
            type="button"
            :value="removeElementButtonLabel"
            @click="removeElement(index)"
            v-if='schema.showRemoveButton'/>
        </component>
      </span>
      <input type="text" v-model="value[index]" v-else/>
      <input
        type="button"
        :value="removeElementButtonLabel"
        @click="removeElement(index)"
        v-if='schema.showRemoveButton'/>
    </div>
    <input type="button" :value="newElementButtonLabel" :class="schema.newElementButtonLabelClasses" @click="newElement"/>
  </div>
</template>

<script>
  import VueFormGenerator from "vue-form-generator";
  import { forEach } from "lodash";
  import Vue from "vue";

  export default {
    props: {
      newElementButtonLabel: {
        type: String,
        default: "+ New"
      },
      removeElementButtonLabel: {
        type: String,
        default: "x"
      }
    },
    mixins: [VueFormGenerator.abstractField],

    methods: {
      generateSchema(rootValue, schema, index) {
        return {
          ...schema,
          set(model, value) {
            Vue.set(rootValue, index, value);
          },
          get(model) {
            return rootValue[index];
          }
        };
      },

      newElement() {
        let value = this.value;
        let itemsDefaultValue = undefined;

        if (!value || !value.push) value = [];

        if (this.schema.items && this.schema.items.default) {
          itemsDefaultValue = this.schema.items.default;
        }

        value.push(itemsDefaultValue);

        this.value = [...value];
      },
      removeElement(index) {
        this.value.splice(index, 1);
      },
      getFieldType(fieldSchema) {
        return "field-" + fieldSchema.type;
      },
      modelUpdated() {}
    }
  };
</script>
