<template lang="pug">
  .min-h-screen.flex.flex-col
    blog-header
    .flex-1.px-2(class="sm:px-0")
      .container.mx-auto
        blog-title
        nuxt
    blog-footer
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import BlogHeader from "../components/BlogHeader.vue";
import BlogFooter from "../components/BlogFooter.vue";
import BlogTitle from "../components/BlogTitle.vue";

@Component({
  components: {
    BlogHeader,
    BlogFooter,
    BlogTitle
  }
})
export default class extends Vue {}
</script>
