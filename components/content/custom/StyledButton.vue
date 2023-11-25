<template>
  <UButton
    :to="to"
    :target="target"
    v-bind="$attrs"
    color="gray"
    :ui="{ rounded: 'rounded-full' }"
  >
    <slot />
  </UButton>
</template>

<script lang="ts">
export default {
  name: "StyledButton",
  props: {
    to: {
      type: String,
      default: "",
    },
    target: {
      type: String,
      default: "",
    },
  },
};
</script>
