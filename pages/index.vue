<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <ULandingHero :ui="{ base: 'relative z-[1]', container: 'max-w-4xl' }" class="mb-[calc(var(--header-height)*2)]">
      <template #headline>
        <UBadge variant="subtle" size="md" class="hover:bg-primary-100 dark:bg-primary-950/100 dark:hover:bg-primary-900 transition-color relative font-medium rounded-full shadow-none">
          <NuxtLink :to="`https://github.com/nuxt/ui/releases/tag/v${config.version}`" target="_blank" class="focus:outline-none" tabindex="-1">
            <span class="absolute inset-0" aria-hidden="true" />
          </NuxtLink>

          <span class="flex items-center gap-1">
            Nuxt UI {{ config.version.split('.').slice(0, -1).join('.') }} is out!
          </span>
        </UBadge>
      </template>

      <template #title>
        <span v-html="page?.hero?.title" />
      </template>

      <template #description>
        <span v-html="page?.hero?.description" />
      </template>

      <!-- <template #links>
        <UButton label="Get Started" icon="i-heroicons-rocket-launch" size="lg" to="/getting-started/installation" />

        <UInput
          v-model="source"
          color="gray"
          readonly
          autocomplete="off"
          icon="i-heroicons-command-line"
          input-class="select-none"
          aria-label="Install @nuxt/ui"
          size="lg"
          :ui="{ base: 'disabled:cursor-default', icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
              aria-label="Copy Code"
              :color="copied ? 'primary' : 'gray'"
              variant="link"
              size="2xs"
              :icon="copied ? 'i-heroicons-clipboard-document-check' : 'i-heroicons-clipboard-document'"
              @click="copy(source)"
            />
          </template>
        </UInput>
      </template> -->

      <ClientOnly>
        <HomeTetris />
      </ClientOnly>
    </ULandingHero>

    <ULandingSection>
          <!-- <UPage> -->
      <!-- <UPageBody> -->
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
          <!-- {{ articles }} -->
          <!-- filter selectors -->
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
            <!-- <template #header>
              <NuxtImg
                :src="article.image || 'cover.gif'"
                :alt="article.title || ''"
                :loading="index === 0 ? 'eager' : 'lazy'"
                class="object-cover object-top w-full h-full"
                width="384"
                height="192"
              />
            </template> -->

            <template #icon class="flex items-center justify-between w-full rounded-full bg-primary-100 dark:bg-primary-950/50">
              <UBadge :label="article.category" variant="subtle" />
              <!-- <UBadge v-if="article.featured" label="Featured" variant="subtle" /> -->
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
  ogImage: 'https://ui.nuxt.com/social-card.png',
  twitterImage: 'https://ui.nuxt.com/social-card.png'
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
