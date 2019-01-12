<template lang="pug">
  blog-parts(title="カテゴリー")
    ul.links
      li.py-1(v-for="category in categories" :key="category.name")
        router-link.text-black.text-sm(:to="url(category)") {{category.name}} ({{category.count}})
</template>


<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Getter } from "vuex-class";

import BlogParts from "components/presentationals/BlogParts.vue";
import { Category } from "models/types";

@Component({
  components: {
    BlogParts
  }
})
export default class extends Vue {
  @Getter("categories")
  public categories!: Category[];

  public url(category: Category): string {
    return `/archive/category/${encodeURIComponent(category.name)}`;
  }
}
</script>
