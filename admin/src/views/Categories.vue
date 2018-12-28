<template lang="pug">
  .container.p-4
    h2.mb-2
      i.fas.fa-tags.fa-fw.mr-2
      | カテゴリー一覧
    table.w-full.border-t.border-b.border-grey
      thead
        tr
          th
            | カテゴリー名
          th
            | スラッグ
          th
            | 記事数
      tbody
        template(v-if="loading")
          tr
            td(colspan="3")
              .text-center
                | 読み込み中...
        template(v-else)
          tr(v-for="category in categories" :key="category.name")
            td 
              a(:href="`/archive/categories/${encodeURIComponent(category.name)}`" target="_blank")
                | {{category.name}}
            td {{category.name}}
            td {{category.count}}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";

@Component
export default class Categories extends Vue {
  // prettier-ignore
  @Action("categories/fetch")
  public fetch!: () => Promise<void>;

  public loading: boolean = false;

  @State((state, getters) => state.categories.rows)
  public categories!: any[];

  public async mounted(): Promise<void> {
    this.loading = true;
    await this.fetch();
    this.loading = false;
  }
}
</script>

<style lang="postcss" scoped>
table > thead > tr > th {
  @apply py-2;
  @apply text-grey-darker bg-grey-lightest;
}

table > tbody > tr > td {
  @apply px-2 py-4;
  @apply border-t border-grey-light;
}
</style>
