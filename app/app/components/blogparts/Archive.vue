<template lang="pug">
  blog-parts(title="月別アーカイブ")
    ul.list-reset
      li.py-1(v-for="archive in archives" :key="archive.date")
        router-link.link.text-black.text-sm(:to="url(archive)") {{archive.date.replace(/-/g, "/")}} ({{archive.count}})
</template>


<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Getter } from "vuex-class";

import BlogParts from "components/presentationals/BlogParts.vue";
import { Archive } from "shared/models/archive";

@Component({
  components: {
    BlogParts
  }
})
export default class extends Vue {
  @Getter("archives")
  public archives!: Archive[];

  public url(archive: Archive): string {
    return `/archive/${archive.date.replace(/\-/g, "/")}`;
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
