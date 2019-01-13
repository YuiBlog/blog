<template lang="pug">
  blog-parts(title="最新記事")
    ul.links
      li.py-1(v-for="entry in entries" :key="entry.slug")
        router-link.text-black.text-sm(:to="`/entry/${entry.url}`") {{entry.title}}
</template>

<script lang="ts">
import dayjs from "dayjs";
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Getter } from "vuex-class";
import { Entries, Entry } from "@yuiblog/types";

import BlogParts from "components/presentationals/BlogParts.vue";

@Component({
  components: {
    BlogParts
  }
})
export default class extends Vue {
  @Getter("latestEntries")
  public entries!: Entry[];
}
</script>
