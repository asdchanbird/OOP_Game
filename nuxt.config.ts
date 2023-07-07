// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt','@nuxtjs/tailwindcss','@element-plus/nuxt',
  ],
  typescript: {
    strict: true,
    typeCheck: true,
  },
  //全域載入css
  css: [
    '@/assets/css/main.css'
  ],
  // app: {
  //   head: {
  //     script: [
  //     {
  //       src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",
  //       type: "text/javascript"
  //     },
  //     {
  //       src:
  //         "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
  //       type: "text/javascript"
  //     },
  //     {
  //       src:
  //         "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
  //       type: "text/javascript"
  //     }
  //   ]
  //   }
  // },
  plugins: [
    { src: "~/plugins/jquery", mode: "client" },
  ],
})
