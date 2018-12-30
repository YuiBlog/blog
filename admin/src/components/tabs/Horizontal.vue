<template lang="pug">
  .flex.flex-col
    ul.list-reset.flex.border-b
      li.mr-1(v-for="(tab, idx) in tabs" :class="{active: tab.active}")
        a(@click.prevent="onClick(idx)") {{tab.name}}
    slot.flex-1
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import TabPane from "@/components/tabs/Pane.vue";

@Component
export default class TabHorizontal extends Vue {
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
a {
  @apply bg-white;
  @apply inline-block;
  @apply py-2 px-4;
  @apply text-blue;
  @apply cursor-pointer;
}

a:hover {
  @apply no-underline;
  @apply text-blue-darker;
}

li.active a {
  @apply border-b-4 border-grey-darker;
}
</style>
