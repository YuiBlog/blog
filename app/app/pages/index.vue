<template lang="pug">
  div
    .border-b.pb-4.mb-8(v-for="entry in entries" :key="entry.id")
      entry-overview(:entry="entry")
</template>

<script lang="ts">
import axios from "axios";
import { Context } from "nuxt";
import { Component, Vue } from "nuxt-property-decorator";

import EntryOverview from "components/EntryOverview.vue";
import MarkdownRenderer from "components/presentationals/MarkdownRenderer.vue";
import { Entry } from "models/entry";

@Component({
  components: {
    EntryOverview,
    MarkdownRenderer
  }
})
export default class extends Vue {
  public entries!: string;

  public async asyncData({ app }: Context): Promise<any> {
    const response = await axios.get("https://blog.mochizuki.moe/api/entries").then(w => w.data);
    return response;
  }
}
</script>
