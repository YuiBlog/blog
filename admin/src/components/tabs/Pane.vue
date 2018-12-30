<template lang="pug">
  div(v-if="active")
    slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TabPane extends Vue {
  @Prop({ required: true })
  public name!: string;

  @Prop({ default: "" })
  public cls!: string;

  public active: boolean = false;
}
</script>
