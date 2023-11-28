import { createResolver } from '@nuxt/kit'
import colors from 'tailwindcss/colors'
// import module from './src/module'
import { excludeColors } from './src/colors'
import pkg from './package.json'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  // @ts-ignore
  extends: [ '@nuxt/ui-pro' ],
  modules: [
    '@nuxt/content',
    'nuxt-og-image',
    // '@nuxt/devtools',
    // '@nuxthq/studio',
    // module,
    '@nuxt/ui',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
    '@nuxtjs/plausible',
    '@vueuse/nuxt',
    'nuxt-component-meta',
    '@nuxt/image'
  ],
  runtimeConfig: {
    public: {
      version: pkg.version
    }
  },
  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons'],
    safelistColors: excludeColors(colors)
  },
  image: {
    // The screen sizes predefined by `@nuxt/image-edge`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
    format: ["avif", "webp"],
    provider: "ipx",
    ipx: {},
    dir: "static",
  },
  content: {
    sources: {
      content: {
        driver: 'github',
        repo: 'siavava/content',
        branch: 'main',
        dir: 'content'
      }
    },
    highlight: {
      preload: [
        'bash',
        'css',
        'diff',
        "f#",
        'html',
        'ini',
        'javascript',
        'julia',
        'json',
        'markdown',
        'php',
        'python',
        'scss',
        'shell',
        'typescript',
        'yaml'
      ]
    },
    markdown: {
      remarkPlugins: [
        "remark-math",
      ],
      rehypePlugins: {
        "rehype-katex": {
          output: "html",
        },
      },
    },
  },
  fontMetrics: {
    fonts: ['DM Sans']
  },
  googleFonts: {
    display: 'swap',
    download: true,
    families: {
      'DM+Sans': [400, 500, 600, 700]
    }
  },
  nitro: {
    prerender: {
      routes: [
        '/',
        '/api/search.json'
      ]
    }
  },
  componentMeta: {
    exclude: [
      '@nuxt/content',
      '@nuxt/ui-templates',
      '@nuxtjs/color-mode',
      '@nuxtjs/mdc',
      'nuxt/dist',
      'nuxt-og-image',
      'nuxt-site-config',
      resolve('./components'),
      '.c12'
    ],
    metaFields: {
      props: true,
      slots: true,
      events: false,
      exposed: false
    }
  },
  hooks: {
    // Related to https://github.com/nuxt/nuxt/pull/22558
    'components:extend': (components) => {
      components.forEach((component) => {
        if (component.shortPath.includes('@nuxt/ui-pro')) {
          component.global = true
        } else if (component.global) {
          component.global = 'sync'
        }
      })
    }
  }
})
