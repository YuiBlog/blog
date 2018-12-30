<template lang="pug">
  .flex
    ul.list-reset.w-12.bg-grey-light
      li.h-12(v-for="(tab, idx) in tabs" :class="{active: tab.active}")
        a.block.w-12.px-4.py-4.text-grey-darker(@click.prevent="onClick(idx)")
          i.fa.fw.mr-2(:class="tab.cls")
    slot.flex-1
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import TabPane from "@/components/tabs/Pane.vue";

@Component
export default class TabVertical extends Vue {
  private tabs: TabPane[] = [];

  public mounted(): void {
    this.tabs = this.$children.map(w => w as TabPane);
    if (this.tabs.length > 0) {
      this.tabs[0].active = true;
    }
  }

  public onClick(idx: number): void {
    this.tabs.forEach((w, i) => {
      w.active = i === idx;
    });
  }
}
</script>

<style lang="postcss" scoped>
li:hover {
  @apply bg-grey-lighter;
}

li.active {
  @apply bg-grey;
}
</style>
