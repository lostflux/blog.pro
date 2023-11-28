export default defineAppConfig({

  link: [
    { rel: "icon", type: "image/svg", href: "https://amittai.studio/favicon.svg" },
    {
      rel: "mask-icon", type: "image/svg", href: "https://amittai.studio/favicon.svg", color: "#f42e4f",
    },
    {
      rel: "apple-touch-icon", type: "image/svg", href: "https://amittai.studio/favicon.svg",
    },
    // {
    //   rel: "manifest", href: "/manifest.json",
    // },
  ],
  ui: {
    primary: 'rose',
    gray: 'neutral',
    content: {
      prose: {
        code: {
          icon: {
          }
        }
      }
    }
  }
})
