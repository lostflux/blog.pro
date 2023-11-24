<template>
  <UMain>
    <UContainer>
      <UPage>
        <template #left>
          <UAside>
            <!-- <BranchSelect /> -->

            <UNavigationTree :links="mapContentNavigation(navigation)" :multiple="false" default-open />
          </UAside>
        </template>

        <slot />
      </UPage>
    </UContainer>
  </UMain>
</template>

<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'
const navigation = await fetchContentNavigation()
</script>
