<template lang="pug">
  blog-parts(title="プロフィール")
    .py-2
      avatar.w-16.h-16(src="https://static.mochizuki.moe/anna.png")

    p.text-sm.leading-normal 三日月ふゆの
    p.my-2.text-sm.leading-normal
      | 文章を書くのは苦手ですが、いろいろカキマス。
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import Avatar from "components/presentationals/Avatar.vue";
import BlogParts from "components/presentationals/BlogParts.vue";

@Component({
  components: {
    Avatar,
    BlogParts
  }
})
export default class extends Vue {}
</script>
