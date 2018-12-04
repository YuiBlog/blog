<template lang="pug">
  .pb-10
    entry-header(:entry="entry")

    markdown-renderer(:markdown="body")
</template>

<script lang="ts">
import axios from "axios";
import { Context } from "nuxt";
import { Component, Vue } from "nuxt-property-decorator";

import EntryHeader from "components/EntryHeader.vue";
import MarkdownRenderer from "components/presentationals/MarkdownRenderer.vue";
import { Entry } from "shared/models/entry";

@Component({
  components: {
    EntryHeader,
    MarkdownRenderer
  }
})
export default class extends Vue {
  public entry!: Entry;

  public head(): any {
    return {
      title: this.entry.title
    };
  }

  public async asyncData({ app, params }: Context): Promise<any> {
    const { year, month, slug } = params;
    let entry!: Entry;
    if (process.server) {
      entry = await app.$firebase.entry.show(year, month, slug);
    } else {
      entry = await axios.get(`https://blog.mochizuki.moe/api/entries/${year}/${month}/${slug}`).then(w => w.data);
    }
    return { entry };
  }

  public get body(): string {
    return this.entry.body.replace(/\\r/g, "\n");
  }
}
</script>
