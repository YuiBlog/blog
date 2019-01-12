<template lang="pug">
  .min-h-screen.flex.flex-col
    blog-header
    .flex-1.px-4(class="sm:px-0")
      .container.mx-auto
        blog-title
        .flex.flex-wrap(class="md:flex-no-wrap")
          .w-full(class="md:w-2/3 md:mr-2 lg:w-3/4 xl:w-4/5")
            nuxt
          .w-full.pt-8(class="md:w-1/3 md:ml-2 md:pt-0 lg:w-1/4 xl:w-1/5")
            blog-sidenav
    blog-footer
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import BlogHeader from "components/BlogHeader.vue";
import BlogFooter from "components/BlogFooter.vue";
import BlogSidenav from "components/BlogSidenav.vue";
import BlogTitle from "components/BlogTitle.vue";

@Component({
  components: {
    BlogHeader,
    BlogFooter,
    BlogSidenav,
    BlogTitle
  }
})
export default class extends Vue {}
</script>
