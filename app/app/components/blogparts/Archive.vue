<template lang="pug">
  blog-parts(title="月間アーカイブ")
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
