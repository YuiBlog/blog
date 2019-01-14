<template lang="pug">
  div
    template(v-if="entries.length > 0")
      h2.mb-2
        | {{archive}}

      .border-b.pb-4.mb-8(v-for="entry in entries" :key="entry.id")
        entry-overview(:entry="entry")
      paginator(:has-next="hasNext" :has-prev="hasPrev" :page="page")
    template(v-else)
      h2.mb-2 Archive Not Found
      p
        | お探しのアーカイブは見つかりませんでした。
</template>

<script lang="ts">
import { Entries, Settings } from "@yuiblog/types";
import axios from "axios";
import { Context } from "nuxt";
import { Component, Vue } from "nuxt-property-decorator";
import { Getter } from "vuex-class";

import EntryOverview from "components/EntryOverview.vue";
import Paginator from "components/presentationals/Paginator.vue";

@Component({
  components: {
    EntryOverview,
    Paginator
  }
})
export default class extends Vue {
  public entries!: Entries;
  public year!: number;
  public month!: number;

  @Getter("title")
  public title!: (str: string) => string;

  public head(): any {
    return {
      title: this.title(`${this.archive} の記事一覧`)
    };
  }

  public get archive(): string {
    return `${this.year}/${this.month}`;
  }

  public async asyncData({ app, params }: Context): Promise<Entries> {
    const { year, month } = params;
    return {
      ...(await axios.get(`${process.env.FIREBASE_HOSTING_URL}/archives/${year}/${month}`).then(w => w.data)),
      month,
      year
    };
  }
}
</script>
