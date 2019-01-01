<template lang="pug">
  tab-horizontal.h-full.max-h-screen.p-2
    tab-pane.flex-1.flex.pt-2(name="編集")
      .flex-1.flex.flex-col.overflow-hidden
        .pb-2
          input.w-full.border.py-3.px-2(v-model="title" placeholder="タイトル")
        markdown-editor.flex-grow.overflow-hidden(v-model="body")
        .pt-2.flex-shrink
          button.px-3.py-2.mr-2.bg-blue.text-white(@click="onClickPublish")
            | 公開する
          button.px-3.py-2.bg-grey.text-white(@click="onClickDraft")
            | 下書き保存する
      .w-80.pl-2
        tab-vertical.h-full
          tab-pane(name="画像" cls="far fa-images")
            img(src="https://static.mochizuki.moe/busy_banner@2x.png")
          tab-pane(name="カテゴリー" cls="fas fa-tags")
            editor-category(v-model="categories")
          tab-pane(name="オプション" cls="fas fa-cog")
            img(src="https://static.mochizuki.moe/busy_banner@2x.png")
    tab-pane.flex-1.py-2.overflow-y-scroll(name="プレビュー")
      markdown-previewer(:markdown="body")
</template>

<script lang="ts">
import VueTagsInput from "@johmun/vue-tags-input";
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";

import EditorCategory from "@/components/editor/Category.vue";
import TabHorizontal from "@/components/tabs/Horizontal.vue";
import TabPane from "@/components/tabs/Pane.vue";
import TabVertical from "@/components/tabs/Vertical.vue";

import MarkdownEditor from "@/components/MarkdownEditor.vue";
import MarkdownPreviewer from "@/components/MarkdownPreviewer.vue";

@Component({
  components: {
    EditorCategory,
    MarkdownEditor,
    MarkdownPreviewer,
    TabHorizontal,
    TabPane,
    TabVertical,
    VueTagsInput
  }
})
export default class Edit extends Vue {
  public body: string = "";
  public categories: string[] = [];
  public created_at!: Date;
  public slug: string = "";
  public title: string = "";

  @Action("entries/publish")
  public publish!: ({ entry }: { entry: any }) => Promise<void>;

  public async onClickPublish(): Promise<void> {
    this.publish({
      entry: {
        body: this.body,
        categories: this.categories,
        created_at: new Date(),
        slug: this.slug,
        status: "publish",
        title: this.title
      }
    });
  }

  public async onClickDraft(): Promise<void> {
    this.publish({
      entry: {
        body: this.body,
        categories: this.categories,
        created_at: new Date(),
        slug: this.slug,
        status: "draft",
        title: this.title
      }
    });
  }

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
  @apply border border-grey;
  @apply py-3 px-4;
  @apply leading-tight;
}

input:focus {
  @apply outline-none;
  @apply border-grey-darker;
}
</style>
