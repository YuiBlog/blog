<template lang="pug">
  .pb-6
    h4.pb-2.font-normal.border-b {{title}}

    .py-2
      slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true })
  public title!: string;
}
</script>
