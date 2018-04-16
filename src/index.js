import FieldArray from "./components/field-array";
import FieldArrayBootstrapAccordionItem from "./components/field-array-bootstrap-accordion-item";

const LibraryModule = {
  FieldArray,
  FieldArrayAccordionItem,

  install(Vue) {
    // Register components with vue
    Vue.component("field-array", FieldArray);
    Vue.component("field-array-bootstrap-accordion-item", FieldArrayBootstrapAccordionItem);
  }
};

// Export library
export default LibraryModule;

// Export components
export { FieldArray, FieldArrayBootstrapAccordionItem };
