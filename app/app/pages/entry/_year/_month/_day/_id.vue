<template lang="pug">
  .pt-5.pb-10
    nuxt-link.inline.bg-orange.text-white.no-underline(class="hover:underline" to="/archive/2018/11/24")
      small.text-xs.m-2 date
    h2.py-2 title

    markdown-renderer(markdown="markdown")
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import MarkdownRenderer from "@/components/MarkdownRenderer.vue";

@Component({
  components: {
    MarkdownRenderer
  }
})
export default class extends Vue {
  public markdown!: string;
}
</script>
