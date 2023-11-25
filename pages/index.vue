<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <ULandingHero :ui="{ base: 'relative z-[1]', container: 'max-w-4xl' }" class="mb-[calc(var(--header-height)*2)]">
      <template #title>
        <span v-html="page?.hero?.title" />
      </template>

      <template #description>
        <span v-html="page?.hero?.description" />
      </template>
      <ClientOnly>
        <HomeTetris />
      </ClientOnly>
    </ULandingHero>

    <ULandingSection>
        <UPageGrid>
          <!-- align select element to right of grid -->
          <USelectMenu
            searchable
            searchable-placeholder="filter..."
            clear-search-on-close
            v-model="category"
            :options="categories"
            label="filter"
            placeholder="filter..."
            :ui="{ base: 'w-full', label: 'sr-only' }"
            class="w-full"
          />
        </UPageGrid>
        <UPageGrid>
          <UPageCard
            v-for="(article, index) in activeArticles"
            :key="index"
            :to="article._path"
            :title="article.title"
            :description="article.description"
            class="flex flex-col"
            :ui="{
              title: 'text-lg',
              description: 'line-clamp-2'
            }"
          >
            <template #icon class="flex items-center justify-between w-full rounded-full bg-primary-100 dark:bg-primary-950/50">
              <UBadge :label="article.category" variant="subtle" />
            </template>

            <template #footer>
              <div class="flex items-center justify-between gap-3">
                <time class="text-gray-500 dark:text-gray-400">{{ formatDate(article.date) }}</time>
              </div>
            </template>
          </UPageCard>
        </UPageGrid>
    </ULandingSection>
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const { fetchList, articles } = useBlog()

const { data: page } = await useAsyncData('index', () => queryContent('').findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// const source = ref('npm i @nuxt/ui')

const config = useRuntimeConfig().public

useSeoMeta({
  titleTemplate: '',
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
  ogImage: page.value.image || '',
  twitterImage: page.value.image || ''
})

// const { format } = Intl.NumberFormat('en-GB', { notation: 'compact' })
await fetchList()

const categories = [...new Set(articles.value.map((article) => article.category)) ]

// prepend "featured" category
categories.unshift('featured')
categories.unshift("all")

const category = ref('')

const activeArticles = computed(() => {
  if (!category.value || category.value === 'all') {
    return articles.value
  }

  // handle "featured" category
  if (category.value === 'featured') {
    return articles.value.filter((article) => article.featured)
  }

  // handle other categories
  return articles.value.filter((article) => article.category === category.value)
})

</script>
