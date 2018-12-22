<template lang="pug">
  div
    entry-header(:entry="entry")

    markdown-renderer(:markdown="body")
    template(v-if="hasReadMore")
      nuxt-link(:to="url") 続きを読む
</template>

<script lang="ts">
import dayjs from "dayjs";
import { Component, Prop, Vue } from "nuxt-property-decorator";

import EntryHeader from "components/EntryHeader.vue";
import MarkdownRenderer from "components/presentationals/MarkdownRenderer.vue";
import { Entry } from "models/types";

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
    const date = new Date(this.entry.created_at._seconds * 1000);
    return `/entry/${dayjs(date).format("YYYY/MM")}/${this.entry.slug}`;
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
