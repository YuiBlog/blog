<template lang="pug">
  .text-center.pb-8
    nuxt-link.button.rounded-l(:to="prevUrl" :disabled="!hasPrev") Prev
    nuxt-link.button.rounded-r(:to="nextUrl" :disabled="!hasNext") Next
</template>

<script lang="ts">
import { Context } from "nuxt";
import { Component, Prop, Vue } from "nuxt-property-decorator";

import EntryOverview from "components/EntryOverview.vue";

@Component
export default class extends Vue {
  private regex = /\/pages\/\d+$/;

  @Prop({ required: true })
  public hasNext!: boolean;

  @Prop({ required: true })
  public hasPrev!: boolean;

  @Prop({ required: true, type: Number })
  public page!: number;

  public get prevUrl(): string {
    return this.createUrl("-");
  }

  public get nextUrl(): string {
    return this.createUrl("+");
  }

  private createUrl(operator: "+" | "-"): string {
    const next = operator === "+" ? this.page + 1 : this.page - 1;
    const path = this.$route.path.replace(/\/pages\/\d+/g, "");
    return path.endsWith("/") ? `${path}pages/${next}` : `${path}/pages/${next}`;
  }
}
</script>
