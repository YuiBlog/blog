<template lang="pug">
  div
    .border-b.pb-4.mb-8(v-for="entry in entries" :key="entry.id")
      entry-overview(:entry="entry")
</template>

<script lang="ts">
import axios from "axios";
import { Context } from "nuxt";
import { Component, Vue } from "nuxt-property-decorator";
import { Entries } from "@yuiblog/types";

import EntryOverview from "components/EntryOverview.vue";

@Component({
  components: {
    EntryOverview
  }
})
export default class extends Vue {
  public entries!: Entries;

  public async asyncData({ app, params }: Context): Promise<Entries> {
    const { year, month } = params;
    return await axios.get(`${process.env.FIREBASE_HOSTING_URL}/archives/${year}/${month}`).then(w => w.data);
  }
}
</script>
