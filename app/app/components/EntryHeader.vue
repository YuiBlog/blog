<template lang="pug">
  div
    p.leading-normal
      small {{date}}

    h2
      nuxt-link.link.text-black(:to="url")
        | {{title}}
</template>

<script lang="ts">
import dayjs from "dayjs";
import { Component, Prop, Vue } from "nuxt-property-decorator";

import { Entry } from "models/entry";

@Component
export default class extends Vue {
  @Prop({ required: true })
  public entry!: Entry;

  public get date(): string {
    const date = new Date(this.entry.created_at._seconds * 1000 + 3600 * 9 * 1000);
    return dayjs(date).format("YYYY/MM");
  }

  public get url(): string {
    return `/entry/${this.date}/${this.entry.slug}`;
  }

  public get title(): string {
    return this.entry.title;
  }
}
</script>
