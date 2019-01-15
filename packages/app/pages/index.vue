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

@Component({
  components: {
    EntryOverview,
    Paginator
  }
})
export default class extends Vue {
  public async asyncData({ app }: Context): Promise<any> {
    return await axios.get(`${process.env.FIREBASE_HOSTING_URL}/api/entries`).then(w => w.data);
  }
}
</script>
