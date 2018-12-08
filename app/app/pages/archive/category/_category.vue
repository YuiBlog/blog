<template lang="pug">
  div
    template(v-if="entries.length > 0")
      .border-b.pb-4.mb-8(v-for="entry in entries" :key="entry.id")
        entry-overview(:entry="entry")
    template(v-else)
      h2.pb-2 Category Not Found
      p
        | お探しのカテゴリーは見つかりませんでした。
</template>

<script lang="ts">
import axios from "axios";
import { Context } from "nuxt";
import { Component, Vue } from "nuxt-property-decorator";

import EntryOverview from "components/EntryOverview.vue";
import { Entries } from "shared/models/entry";

@Component({
  components: {
    EntryOverview
  }
})
export default class extends Vue {
  public entries!: Entries;

  public async asyncData({ app, params }: Context): Promise<Entries> {
    const { category } = params;
    if (process.server) {
      return await app.$firebase.category.entries(category, 0);
    } else {
      return await axios.get(`https://blog.mochizuki.moe/api/categories/${category}`).then(w => w.data);
    }
  }
}
</script>
