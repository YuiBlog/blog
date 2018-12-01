<template lang="pug">
  blog-parts(title="Happy Busy")
    img(src="https://static.mochizuki.moe/busy_banner.png")
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import BlogParts from "presentationals/BlogParts.vue";

@Component({
  components: {
    BlogParts
  }
})
export default class extends Vue {}
</script>
