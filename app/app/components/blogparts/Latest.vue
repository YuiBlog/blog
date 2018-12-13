<template lang="pug">
  blog-parts(title="最新記事")
    ul.list-reset
      li.py-1(v-for="entry in entries" :key="entry.slug")
        router-link.text-black.text-sm(:to="url(entry)") {{entry.title}}
</template>

<script lang="ts">
import dayjs from "dayjs";
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Getter } from "vuex-class";

import BlogParts from "components/presentationals/BlogParts.vue";
import { Entry, Entries } from "shared/models/entry";

@Component({
  components: {
    BlogParts
  }
})
export default class extends Vue {
  @Getter("latestEntries")
  public entries!: Entry[];

  public url(entry: Entry): string {
    const date = new Date(entry.created_at._seconds * 1000);
    return `/entry/${dayjs(date).format("YYYY/MM")}/${entry.slug}`;
  }
}
</script>

<style lang="scss" scoped>
ul {
  li {
    a {
      &:before {
        content: "\25B8 ";
      }
    }
  }
}
</style>
