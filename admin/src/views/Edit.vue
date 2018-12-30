<template lang="pug">
  .flex.flex-col.h-full.p-4.max-h-screen
    ul.list-reset.flex.border-b
      li.mr-1(v-for="(tab, idx) in tabs" :class="getClass(idx)")
        a(@click.prevent="onClick(idx)") {{tab.name}}
    .flex-1.py-2.overflow-hidden
      div(:is="content" v-model="body" :markdown="body")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import MarkdownEditor from "@/components/MarkdownEditor.vue";
import MarkdownPreviewer from "@/components/MarkdownPreviewer.vue";

@Component({
  components: {
    MarkdownEditor,
    MarkdownPreviewer
  }
})
export default class Edit extends Vue {
  public index: number = 0;
  public tabs = [{ name: "編集", content: "markdown-editor" }, { name: "プレビュー", content: "markdown-previewer" }];

  public title: string = "";
  public body: string = "";
  public categories: string[] = [];

  public getClass(idx: number): string {
    return this.index === idx ? "active" : "";
  }

  public onClick(idx: number): void {
    this.index = idx;
  }

  public get content(): string {
    return this.tabs[this.index].content;
  }
}
</script>

<style lang="postcss" scoped>
.h-full.max-h-screen {
  max-height: calc(100vh - 64px);
}

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

li.active {
  @apply -mb-px;
}

li.active a {
  @apply border-l border-t border-r rounded-t;
}
</style>
