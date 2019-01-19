<template lang="pug">
  error(title="Category Not Found" description="お探しのカテゴリーは見つかりませんでした。")
</template>

<script lang="ts">
import { Context } from "nuxt";
import { Component, Vue } from "nuxt-property-decorator";

import Error from "components/presentationals/Error.vue";

@Component({ components: { Error } })
export default class extends Vue {
  public async asyncData({ res }: Context): Promise<void> {
    res.statusCode = 404;
  }
}
</script>
