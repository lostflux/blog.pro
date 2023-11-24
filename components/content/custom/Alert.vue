<template>
  <Callout class="alert-container">
    <span class="title">
      {{ title || type }}
    </span>
    <slot/>
  </Callout>
</template>

<script lang="ts">
export default {
  name: "Alert",
  props: {
    type: {
      type: String,
      default: "info",
      validator: (value: string) => [
        "info", "success", "error", "warning", "critical",
      ].includes(value),
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="sass">
@use "@/styles/other/colors"

.alert-container
  margin: 1em 0
  padding: 1em 1em 0.5em 1em
  border-radius: 0.5rem

  .prose-ul
    font-size: inherit !important

    li::before
      color: inherit !important

  .alert-icon
    width: 1.5em
    height: 1.5em
    margin-right: 0.5em
    padding-bottom: 0.25em

  .title-container
    margin-bottom: 1em
    display: flex
    flex-direction: row

  .title
    font-weight: 600
    text-transform: uppercase
    font-size: 0.8em
    margin: 0em 0 0.5em 0
    border-bottom: 1px dotted
    opacity: 0.5
    width: fit-content

  &:hover
    & > .title
      opacity: 1

</style>
