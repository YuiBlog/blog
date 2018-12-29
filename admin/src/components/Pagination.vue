<template lang="pug">
  .text-center
    a.button.rounded-l(@click="onClickPrev" :disabled="!hasPrev") 前へ
    a.button.rounded-r(@click="onClickNext" :disabled="!hasNext") 次へ
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Pagination extends Vue {
  @Prop({ required: true })
  public hasNext!: boolean;

  @Prop({ required: true })
  public hasPrev!: boolean;

  public onClickNext(): void {
    if (this.hasNext) {
      this.$emit("next");
    }
  }

  public onClickPrev(): void {
    if (this.hasPrev) {
      this.$emit("prev");
    }
  }
}
</script>


<style lang="postcss" scoped>
.button {
  @apply bg-grey-light;
  @apply text-grey-darkest;
  @apply text-sm;
  @apply no-underline;
  @apply px-4 py-2;
  @apply cursor-pointer;
}

.button:hover {
  @apply bg-grey;
  @apply no-underline;
}

.button[disabled],
.button[disabled]:hover {
  @apply bg-grey-lighter;
  @apply text-grey-darker;
  @apply cursor-default;
  @apply pointer-events-none;
}
</style>
