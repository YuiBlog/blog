<template lang="pug">
  div
    entry-header(:entry="entry")

    markdown-renderer(:markdown="body")
    template(v-if="hasReadMore")
      nuxt-link(:to="url") 続きを読む
</template>

<script lang="ts">
import { Entry } from "@yuiblog/types";
import MarkdownRenderer from "@yuiblog/markdown";
import dayjs from "dayjs";
import { Component, Prop, Vue } from "nuxt-property-decorator";

import EntryHeader from "components/EntryHeader.vue";

@Component({
  components: {
    EntryHeader,
    MarkdownRenderer
  }
})
export default class extends Vue {
  @Prop({ required: true })
  public entry!: Entry;

  public get url(): string {
    return `/entry/${this.entry.url}`;
  }

  public get body(): string {
    const idx = this.entry.body.indexOf("<!-- more -->");
    return this.entry.body.substring(0, idx < 0 ? this.entry.body.length : idx);
  }

  public get hasReadMore(): boolean {
    return this.entry.body.indexOf("<!-- more -->") > 0;
  }
}
</script>
