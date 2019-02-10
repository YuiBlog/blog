<template lang="pug">
  .flex.items-center.py-4.border-b
    label.block(class="md:w-1/3")
      | {{title}}
    div(class="md:w-2/3")
      slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Row extends Vue {
  @Prop({ required: true })
  public title!: string;
}
</script>
