<template lang="pug">
  div
    h2.mb-2 {{title}}
    p {{description}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class Error extends Vue {
  @Prop({ required: true })
  public title!: string;

  @Prop({ required: true })
  public description!: string;
}
</script>
