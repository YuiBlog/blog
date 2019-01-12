<template lang="pug">
  div
    h2.pb-2 Category Not Found
    p
      | お探しのカテゴリーは見つかりませんでした。
</template>

<script lang="ts">
import { Context } from "nuxt";
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  public async asyncData({ res }: Context): Promise<void> {
    res.statusCode = 404;
  }
}
</script>
