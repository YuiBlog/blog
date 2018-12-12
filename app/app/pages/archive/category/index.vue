<template lang="pug">
  div
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

  public async asyncData({ res }: Context): Promise<void> {
    res.statusCode = 404;
  }
}
</script>
