<template lang="pug">
  tab-horizontal.h-full.max-h-screen.p-2
    tab-pane.flex-1.flex.pt-2(name="編集")
      .flex-1.flex.flex-col
        .pb-2
          input.w-full.border.py-3.px-2(v-model="title" placeholder="タイトル")
        markdown-editor.flex-1(v-model="body")
      .w-64.px-2
        tab-vertical.h-full
          tab-pane(name="画像" cls="far fa-images")
            p Hello, World
          tab-pane(name="カテゴリー" cls="fas fa-tags")
          tab-pane(name="オプション" cls="fas fa-cog")
    tab-pane.flex-1.py-2.overflow-y-scroll(name="プレビュー")
      markdown-previewer(:markdown="body")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import TabHorizontal from "@/components/tabs/Horizontal.vue";
import TabPane from "@/components/tabs/Pane.vue";
import TabVertical from "@/components/tabs/Vertical.vue";

import MarkdownEditor from "@/components/MarkdownEditor.vue";
import MarkdownPreviewer from "@/components/MarkdownPreviewer.vue";

@Component({
  components: {
    MarkdownEditor,
    MarkdownPreviewer,
    TabHorizontal,
    TabPane,
    TabVertical
  }
})
export default class Edit extends Vue {
  public title: string = "";
  public body: string = "";
  public categories: string[] = [];

  public beforeRouteLeave(to: any, from: any, next: any): void {
    if (this.body !== "") {
      const r = confirm("編集した内容が失われますがよろしいですか？");
      if (!r) {
        return;
      }
    }
    next();
  }
}
</script>

<style lang="postcss" scoped>
.h-full.max-h-screen {
  max-height: calc(100vh - 64px);
}

input {
  @apply appearance-none;
  @apply block;
  @apply w-full;
  @apply text-grey-darkest;
  @apply border border-grey rounded;
  @apply py-3 px-4;
  @apply leading-tight;
}

input:focus {
  @apply outline-none;
  @apply border-grey-darker;
}
</style>
