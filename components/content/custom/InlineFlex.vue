<template>
  <div
    class="inline-flex-div"
    :style="{
      justifyContent: justify,
      alignItems: align,
    }"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">

// define props
defineProps({
  justify: {
    type: String,
    default: "space-around",
  },
  align: {
    type: String,
    default: "center",
  },
});
</script>
<style lang="sass" scoped>
.inline-flex-div
  width: 100%
  display: inline-flex
  gap: 10px
  padding: 10px
</style>
