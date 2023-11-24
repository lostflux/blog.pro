<template>
  <UPage>
    <UPageHeader :title="page.title" :description="page.description" :links="page.links" :headline="headline" />

    <UPageBody prose>
      <ContentRenderer v-if="page.body" :value="page" />

      <hr v-if="surround?.length">

      <UDocsSurround :surround="surround" />
    </UPageBody>

    <template #right>
      <UDocsToc :links="page.body.toc.links">
        <template #bottom>
          <div class="hidden lg:block space-y-6 !mt-6">
            <UDivider v-if="page.body?.toc?.links?.length" type="dashed" />

            <UPageLinks title="Actions" :links="links" />
          </div>
        </template>
      </UDocsToc>
    </template>
  </UPage>
</template>

<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()
const { branch } = useContentSource()

definePageMeta({
  layout: 'docs'
})

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryContent()
    .where({
      _extension: 'md',
      // only current category
      category: {
        $contains: page.value?.category
      },
      navigation: {
        $ne: false
      }
    })
    // sort by date
    // .sort({ date: -1 })
    .only(['title', 'description', '_path'])
    .findSurround(withoutTrailingSlash(route.path))
})

const headline = computed(() => page.value?.category || "")

useSeoMeta({
  titleTemplate: '%s - Nuxt UI',
  title: page.value.title,
  ogTitle: `${page.value.title} - Nuxt UI`,
  description: page.value.description,
  ogDescription: page.value.description
})

defineOgImage({
  component: 'Docs',
  title: page.value.title,
  description: page.value.description,
  headline: headline.value
})

const links = computed(() => [{
  icon: 'i-heroicons-pencil-square',
  label: 'Edit this page',
  to: `https://github.com/siavava/blog/edit/content/${page?.value?._file}`,
  target: '_blank'
}, {
  icon: 'i-heroicons-star',
  label: 'View on GitHub',
  to: 'https://github.com/nuxt/ui',
  target: '_blank'
},{
  icon: 'i-heroicons-bars-3-bottom-right-solid',
  label: 'Minimal Version',
  to: `https://txt.amittai.studio${page.value?._path}`,
  target: '_blank'
},{
  icon: 'i-heroicons-user-minus-solid',
  label: 'About Me',
  to: 'https://amittai.studio',
  target: '_blank'
}])
</script>
