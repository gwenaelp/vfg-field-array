<template>
  <div>
    <div>
      <div class="title">
        <a @click="contentVisible = !contentVisible">
          {{contentVisible ? "-" : "+"}} Container ({{model}})
        </a>
        <a @click="$emit('moveItemUp')">
          ↑
        </a>
        <a @click="$emit('moveItemDown')">
          ↓
        </a>
        <a @click="$emit('removeItem')">
          X
        </a>
      </div>
      <div class="content" v-if="contentVisible">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["model"],
    data() {
      return {
        contentVisible: false
      };
    }
  };
</script>
<style scoped>
  .title {
    background: whitesmoke;
  }

  .content {
    border: 2px solid whitesmoke;
    padding: 10px;
  }

  a {
    color: blue;
    text-decoration: underline;
  }
</style>
