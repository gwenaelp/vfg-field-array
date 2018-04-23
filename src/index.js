import FieldArray from "./components/field-array";

const LibraryModule = {
  FieldArray,

  install(Vue) {
    // Register components with vue
    Vue.component("field-array", FieldArray);
  }
};

// Export library
export default LibraryModule;

// Export components
export { FieldArray };
