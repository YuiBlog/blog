<template lang="pug">
  tab-horizontal.h-full.max-h-screen.p-4
    tab-pane.flex-1.flex.py-2(name="編集")
      .flex-1
        markdown-editor(v-model="body")
      .w-64.px-2
        .border-grey
    tab-pane.flex-1.py-2.overflow-y-scroll(name="プレビュー")
      markdown-previewer(:markdown="body")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import TabHorizontal from "@/components/tabs/Horizontal.vue";
import TabPane from "@/components/tabs/Pane.vue";

import MarkdownEditor from "@/components/MarkdownEditor.vue";
import MarkdownPreviewer from "@/components/MarkdownPreviewer.vue";

@Component({
  components: {
    MarkdownEditor,
    MarkdownPreviewer,
    TabHorizontal,
    TabPane
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
</style>
