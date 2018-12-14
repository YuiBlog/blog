<template lang="pug">
  div
    .border-b.pb-4.mb-8(v-for="entry in entries" :key="entry.id")
      entry-overview(:entry="entry")
    paginator(:has-next="hasNext" :has-prev="hasPrev" :page="page")
</template>

<script lang="ts">
import axios from "axios";
import { Context } from "nuxt";
import { Component, Vue } from "nuxt-property-decorator";

import EntryOverview from "components/EntryOverview.vue";
import Paginator from "components/presentationals/Paginator.vue";
import { Entry, Entries } from "shared/models/entry";
import { asTyped } from "shared/utils";

@Component({
  components: {
    EntryOverview,
    Paginator
  }
})
export default class extends Vue {
  public entries!: string;

  public validate({ params }: Context): boolean {
    return /^\d+$/.test(params.page);
  }

  public async asyncData({ app, params, redirect }: Context): Promise<Entries> {
    const { page } = asTyped(params);
    console.log(JSON.stringify(page));
    if (process.server) {
      return await app.$firebase.entry.list(page);
    } else {
      return await axios.get(`https://blog.mochizuki.moe/api/entries?page=${page}`).then(w => w.data);
    }
  }
}
</script>
