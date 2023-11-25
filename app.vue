<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <Header v-if="!$route.path.startsWith('/examples')" :links="[]" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <AppFooter v-if="!$route.path.startsWith('/examples')" />

    <ClientOnly>
      <LazyUDocsSearch ref="searchRef" :files="files" :navigation="navigation" :groups="groups" :links="links" />
    </ClientOnly>

    <!-- <UNotifications>
      <template #title="{ title }">
        <span v-html="title" />
      </template>
    </UNotifications> -->
  </div>
</template>

<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import { debounce } from 'perfect-debounce'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const searchRef = ref()

const route = useRoute()
const colorMode = useColorMode()
const { branch, branches } = useContentSource()

const { data: nav } = await useAsyncData('navigation', () => fetchContentNavigation())
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

// Computed

const navigation = computed(() => {
  if (branch.value?.name === 'dev') {
    const dev = nav.value.find(item => item._path === '/dev')?.children
    const pro = nav.value.find(item => item._path === '/pro')

    return [
      ...dev,
      ...(pro ? [pro] : [])
    ]
  }

  return nav.value.filter(item => item._path !== '/dev')
})

const groups = computed(() => {
  if (route.path === '/') {
    return []
  }

  return [{ key: 'branch', label: 'Branch', commands: branches.value }]
})

const color = computed(() => colorMode.value === 'dark' ? '#18181b' : 'white')

// Watch

watch(() => searchRef.value?.commandPaletteRef?.query, debounce((query: string) => {
  if (!query) {
    return
  }

  useTrackEvent('Search', { props: { query: `${query} - ${searchRef.value?.commandPaletteRef.results.length} results` } })
}, 500))

// Head

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'https://amittai.studio/favicon.svg' },
    { rel: 'canonical', href: `https://ui.nuxt.com${withoutTrailingSlash(route.path)}` }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useServerSeoMeta({
  ogSiteName: "Amittai's Blog",
})

// Provide

provide('navigation', navigation)
provide('files', files)
</script>
