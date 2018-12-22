<template lang="pug">
  .pb-10
    entry-header(:entry="entry")

    markdown-renderer(:markdown="body")

    .flex
      .flex-1.truncate.pr-2.previous(v-if="previous != null")
        nuxt-link(:to="asEntryUrl(previous)") {{previous.title}}
      .flex-1.truncate.pl-2.next(v-if="next != null")
        nuxt-link(:to="asEntryUrl(next)") {{next.title}}
</template>

<script lang="ts">
import axios from "axios";
import dayjs from "dayjs";
import { Context } from "nuxt";
import { Component, Vue } from "nuxt-property-decorator";

import EntryHeader from "components/EntryHeader.vue";
import MarkdownRenderer from "components/presentationals/MarkdownRenderer.vue";

import { Entry, EntryMinified } from "models/types";

@Component({
  components: {
    EntryHeader,
    MarkdownRenderer
  }
})
export default class extends Vue {
  public entry!: Entry;
  public next!: Entry;
  public previous!: Entry;

  public head(): any {
    return {
      title: this.entry.title
    };
  }

  public async asyncData({ app, params }: Context): Promise<any> {
    const { year, month, slug } = params;
    return await axios.get(`${process.env.FIREBASE_HOSTING_URL}/entries/${year}/${month}/${slug}`).then(w => w.data);
  }

  public get body(): string {
    return this.entry.body.replace(/\\r/g, "\n");
  }

  public asEntryUrl(entry: EntryMinified): string {
    const date = new Date(entry.created_at._seconds * 1000);
    return `/entry/${dayjs(date).format("YYYY/MM")}/${entry.slug}`;
  }
}
</script>

<style lang="scss" scoped>
.next::before {
  content: "\00BB";
  padding-left: 0.5rem;
  float: right;
}

.previous::before {
  content: "\00AB";
  padding-right: 0.5rem;
}
</style>
