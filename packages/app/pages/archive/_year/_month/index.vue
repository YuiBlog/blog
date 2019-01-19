<template lang="pug">
  div
    template(v-if="entries.length > 0")
      h2.mb-2
        | {{archive}}

      .border-b.pb-4.mb-8(v-for="entry in entries" :key="entry.id")
        entry-overview(:entry="entry")
      paginator(:has-next="hasNext" :has-prev="hasPrev" :page="page")
    template(v-else)
      error(title="Archive Not Found" description="お探しのアーカイブは見つかりませんでした。")
</template>

<script lang="ts">
import { Entries, Settings } from "@yuiblog/types";
import axios from "axios";
import { Context } from "nuxt";
import { Component, Vue } from "nuxt-property-decorator";
import { Getter } from "vuex-class";

import EntryOverview from "components/EntryOverview.vue";
import Error from "components/presentationals/Error.vue";
import Paginator from "components/presentationals/Paginator.vue";

@Component({
  components: {
    EntryOverview,
    Error,
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

  public async asyncData({ app, params, res }: Context): Promise<any> {
    const { year, month } = params;
    const entry = await axios.get(`${process.env.FIREBASE_HOSTING_URL}/api/archives/${year}/${month}`).then(w => w.data);
    if (entry) {
      return {
        ...entry,
        month,
        year
      };
    } else {
      res.statusCode = 404;
    }
  }
}
</script>
