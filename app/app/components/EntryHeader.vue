<template lang="pug">
  div
    p.leading-normal.pb-1
      small {{formatDate("YYYY/MM/DD")}}

    h2
      nuxt-link.link.text-black(:to="url")
        | {{title}}
</template>

<script lang="ts">
import dayjs from "dayjs";
import { Component, Prop, Vue } from "nuxt-property-decorator";

import { Entry } from "shared/models/entry";

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
    const date = new Date(this.entry.created_at._seconds * 1000 + 3600 * 9 * 1000);
    return dayjs(date).format(format);
  }
}
</script>
