<template lang="pug">
  div
    .border-b.pb-4.mb-8(v-for="entry in entries" :key="entry.id")
      entry-overview(:entry="entry")
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
    const { year, month } = params;
    if (process.server) {
      return await app.$firebase.archive.entries(year, month, 0);
    } else {
      return await axios.get(`${process.env.FIREBASE_HOSTING_URL}/api/archives/${year}/${month}`).then(w => w.data);
    }
  }
}
</script>
