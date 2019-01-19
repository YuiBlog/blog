<template lang="pug">
  div
    template(v-if="entries.length > 0")
      h2.mb-2 {{category}}

      .border-b.pb-4.mb-8(v-for="entry in entries" :key="entry.id")
        entry-overview(:entry="entry")
      paginator(:has-next="hasNext" :has-prev="hasPrev" :page="page")
    template(v-else)
      error(title="Category Not Found" description="お探しのエントリーは見つかりませんでした。")
</template>

<script lang="ts">
import { Entries } from "@yuiblog/types";
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
  public category!: string;

  @Getter("title")
  public title!: (str: string) => string;

  public head(): any {
    return {
      title: this.title(`${this.category} カテゴリーの記事一覧`)
    };
  }

  public async asyncData({ app, params }: Context): Promise<Entries> {
    const { category } = params;
    return {
      ...(await axios.get(`${process.env.FIREBASE_HOSTING_URL}/api/categories/${encodeURIComponent(category)}`).then(w => w.data)),
      category
    };
  }
}
</script>
