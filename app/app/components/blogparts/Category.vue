<template lang="pug">
  blog-parts(title="カテゴリー")
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
