<template lang="pug">
  .rounded-full.shadow-md
    img.rounded-full(:src="src" alt="avatar")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true })
  public src!: string;
}
</script>

