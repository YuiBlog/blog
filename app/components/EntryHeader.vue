<template lang="pug">
  div
    p.leading-normal.pb-1
      small {{formatDate("YYYY/MM/DD")}}

    h2.mb-2
      nuxt-link.text-black(:to="url")
        | {{title}}

    ul.list-reset
      li.inline.px-2.py-1.mr-1.text-xs.bg-grey-light.rounded(v-for="category in entry.categories")
        nuxt-link.text-black(:to="`/archive/category/${category}`") {{category}}
</template>

<script lang="ts">
import dayjs from "dayjs";
import { Component, Prop, Vue } from "nuxt-property-decorator";

import { Entry } from "models/types";

@Component
export default class extends Vue {
  @Prop({ required: true })
  public entry!: Entry;

  public get url(): string {
    return `/entry/${this.formatDate("YYYY/MM")}/${this.entry.slug}`;
  }

  public get title(): string {
    return this.entry.title;
  }

  public formatDate(format: string): string {
    const date = new Date(this.entry.created_at._seconds * 1000);
    return dayjs(date).format(format);
  }
}
</script>

<style lang="scss" scoped>
h2 {
  overflow-wrap: break-word;
}
</style>
