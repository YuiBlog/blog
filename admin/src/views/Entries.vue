<template lang="pug">
  .container.p-4
    h2.mb-2
      i.fas.fa-newspaper.fa-fw.mr-2
      | 記事一覧
    table.table-fixed.w-full.border-t.border-b.border-grey
      thead
        tr
          th(class="w-1/2") タイトル
          th(class="w-1/5") カテゴリー
          th(class="w-1/5") 投稿日時
          th(class="w-auto")
      tbody
        template(v-if="loading")
          tr
            td(colspan="4")
              .text-center
                | 読み込み中
        template(v-else)
          tr(v-for="entry in entries" :key="entry.slug")
            td(class="w-1/2")
              | {{entry.title}}
            td(class="w-1/5")
              span.mr-2(v-for="category in entry.categories")
                | {{category}}
            td(class="w-1/5") {{entry.created_at.toDate() | humanize}}
            td(class="w-auto")
              a(:href="entry | asEntryUrl" target="_blank")
                i.fas.fa-external-link-alt.fa-fw
</template>

<script lang="ts">
import dayjs from "dayjs";
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";

function asEntryUrl(entry: any): string {
  const date = dayjs(entry.created_at.toDate());
  return `/entry/${date.format("YYYY/MM")}/${entry.slug}`;
}

function humanize(date: Date): string {
  return dayjs(date).format("YYYY/MM/DD HH:mm:ss");
}

@Component({
  filters: { asEntryUrl, humanize }
})
export default class Entries extends Vue {
  // prettier-ignore
  @Action("entries/fetch")
  public fetch!: (page: number) => Promise<void>;

  public loading: boolean = false;

  @State((state, getters) => state.entries.rows)
  public entries!: any[];

  public async mounted(): Promise<void> {
    this.loading = true;
    await this.fetch(0);
    this.loading = false;
  }
}
</script>

<style lang="postcss" scoped>
table > thead > tr > th {
  @apply truncate;
  @apply pl-2 py-2;
  @apply text-left;
  @apply text-grey-darker bg-grey-lightest;
}

table > tbody > tr > td {
  @apply truncate;
  @apply px-2 py-4;
  @apply text-xs;
  @apply border-t border-grey-light;
}
</style>
