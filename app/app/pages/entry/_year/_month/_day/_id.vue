<template lang="pug">
  .pt-5.pb-10
    entry-header(:entry="entry")

    markdown-renderer(:markdown="body")
</template>

<script lang="ts">
import axios from "axios";
import { Context } from "nuxt";
import { Component, Vue } from "nuxt-property-decorator";

import EntryHeader from "components/EntryHeader.vue";
import MarkdownRenderer from "components/presentationals/MarkdownRenderer.vue";
import { Entry } from "models/entry";

@Component({
  components: {
    EntryHeader,
    MarkdownRenderer
  }
})
export default class extends Vue {
  public entry!: Entry;

  public async asyncData({ params }: Context): Promise<any> {
    const { year, month, id } = params;
    const entry = await axios.get(`https://blog.mochizuki.moe/api/entries/${year}/${month}/${id}`).then(w => w.data);
    return { entry };
  }

  public get body(): string {
    return this.entry.body.replace(/\\r/g, "\n");
  }
}
</script>
