<template>
    <div>
        <div class="card">
            <div class="card-header" :id="'heading' + id" :class="{'bg-danger': hasError}">
                <h5 class="mb-0">
                    <a data-toggle="collapse" :data-target="'#collapse' + id" aria-expanded="false" :aria-controls="'collapse' + id">
                        {{ headerText }}
                    </a>
                    <input type="button" class="btn btn-danger btn-sm float-right" @click="$emit('removeItem')" :value="removeElementButtonLabel" />
                    <input type="button" class="btn btn-outline-dark btn-sm float-right mr-1" @click="moveItem('moveItemDown')" :value="moveElementDownButtonLabel" />
                    <input type="button" class="btn btn-outline-dark btn-sm float-right mr-1" @click="moveItem('moveItemUp')" :value="moveElementUpButtonLabel" />
                </h5>
            </div>

            <div :id="'collapse' + id" class="collapse" :aria-labelledby="'heading' + id" :data-parent="'#'+parentId" >
                <div class="card-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default  {
        name: "FieldArrayBootstrapAccordionItem",
        props: ["model", "index", "schema", "id", "parentId", "removeElementButtonLabel",
            "moveElementDownButtonLabel", "moveElementUpButtonLabel", "itemContainerHeader"],
        data() {
            return {
                hasError: false
            };
        },
        computed: {
            headerText() {
                if(typeof this.itemContainerHeader === "function") {
                    return this.itemContainerHeader(this.model, this.schema, this.index);
                } else if(typeof this.itemContainerHeader !== "undefined") {
                    return typeof this.itemContainerHeader;
                }

                return "Field " + (this.index + 1);
            }
        },
        methods: {
            validate(calledParent) {
                if(this.$children.length < 1) {
                    console.warn("The accordion item of the array field seam to be empty. Could not validate");
                    return false;
                }

                return this.$children[0].validate(calledParent);
            },
            validated(isValid, errors) {
                this.hasError = !isValid;
            },
            moveItem(direction) {
                $("#collapse" + this.id).collapse("hide");
                this.$emit(direction);
            }
        },
        mounted() {
            if(!this.$slots.default || typeof this.$slots.default[0] !== "object"
                || typeof this.$slots.default[0].componentInstance !== "object"
                || typeof this.$slots.default[0].componentInstance.$on !== "function") {
                return;
            }

            this.$slots.default[0].componentInstance.$on("validated", this.validated);
        }
    }
</script>

<style scoped>

</style>
