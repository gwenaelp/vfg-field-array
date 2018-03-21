import Vue from "vue";
import FieldArray from "../field-array";

describe("field-array.vue", () => {
  const Constructor = Vue.extend(FieldArray);
  const vm = new Constructor().$mount();

  test("should match the snapshot", () => {
    expect(vm.$el).toMatchSnapshot();
  });
});
