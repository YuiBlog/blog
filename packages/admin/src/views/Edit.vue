<template lang="pug">
  div.h-full.max-h-screen
    template(v-if="!published")
      tab-horizontal.h-full.p-2
        tab-pane.flex-1.flex.pt-2(name="編集")
          .flex-1.flex.flex-col.overflow-hidden
            .pb-2
              input.w-full.border(v-model="title" placeholder="タイトル")
            markdown-editor.flex-grow.overflow-hidden(v-model="body")
            .pt-2.flex-shrink
              button.px-3.py-2.mr-2.bg-blue.text-white(@click.prevent="onClickPublish")
                template(v-if="id")
                  | 更新する
                template(v-else)
                  | 公開する
              button.px-3.py-2.bg-grey.text-white(@click.prevent="onClickDraft")
                | 下書き保存する
          .w-80.pl-2
            tab-vertical.h-full
              tab-pane(name="画像" cls="far fa-images")
                img(src="https://static.mochizuki.moe/busy_banner@2x.png")
              tab-pane(name="カテゴリー" cls="fas fa-tags")
                editor-category(v-model="categories")
              tab-pane(name="オプション" cls="fas fa-cog")
                h3.pl-2.mb-2 編集オプション
                editor-date(v-model="createdAt")
                editor-slug(v-model="slug" :date="createdAt")
                editor-passphrase(v-model="passphrase")
        tab-pane.flex-1.py-2.overflow-y-scroll(name="プレビュー")
          markdown-renderer(:markdown="body")
    template(v-else)
      .container.p-4
        .border-l-4.border-blue.bg-blue-lightest.p-4
          | ブログを更新しました

        .text-center.m-4
          button.border.rounded.bg-grey-lighter.p-2.m-2.text-black(@click="published = false")
            | 続けて投稿する
</template>

<script lang="ts">
import VueTagsInput from "@johmun/vue-tags-input";
import MarkdownRenderer from "@yuiblog/markdown";
import { Entry } from "@yuiblog/types";
import dayjs from "dayjs";
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";

import EditorCategory from "@/components/editor/Category.vue";
import EditorDate from "@/components/editor/Date.vue";
import EditorPassphrase from "@/components/editor/Passphrase.vue";
import EditorSlug from "@/components/editor/Slug.vue";
import TabHorizontal from "@/components/tabs/Horizontal.vue";
import TabPane from "@/components/tabs/Pane.vue";
import TabVertical from "@/components/tabs/Vertical.vue";
import MarkdownEditor from "@/components/MarkdownEditor.vue";

@Component({
  components: {
    EditorCategory,
    EditorDate,
    EditorPassphrase,
    EditorSlug,
    MarkdownEditor,
    MarkdownRenderer,
    TabHorizontal,
    TabPane,
    TabVertical,
    VueTagsInput
  }
})
export default class Edit extends Vue {
  public id: string = "";
  public body: string = "";
  public categories: string[] = [];
  public createdAt: string = "";
  public passphrase: string = "";
  public slug: string = "";
  public title: string = "";
  public published: boolean = false;

  @Action("entry/fetch")
  public fetchEntry!: ({ id: string }) => Promise<void>;

  @Action("entry/publish")
  public publish!: ({ entry }: { entry: any }) => Promise<void>;

  @State((state, getters) => state.entry.row)
  public entry!: Entry | null;

  public async created(): Promise<void> {
    if (this.$route.query.id) {
      await this.fetchEntry({ id: this.$route.query.id as string });
      if (this.entry) {
        this.id = this.entry.id;
        this.body = this.entry.body;
        this.categories = this.entry.categories;
        this.createdAt = dayjs((this.entry.created_at as any).toDate()).format("YYYY/MM/DD HH:mm:ss");
        this.passphrase = this.entry.passphrase || "";
        this.slug = this.entry.slug;
        this.title = this.entry.title;
      }
    }
  }

  public async onClickPublish(): Promise<void> {
    this.publish({
      entry: {
        body: this.body,
        categories: this.categories,
        created_at: this.createdAt !== "" ? new Date(this.createdAt) : new Date(),
        id: this.id,
        passphrase: this.passphrase,
        slug: this.slug,
        status: "publish",
        title: this.title || "無題"
      }
    });
    this.published = true;
    this.reset();
  }

  public async onClickDraft(): Promise<void> {
    this.publish({
      entry: {
        body: this.body,
        categories: this.categories,
        created_at: this.createdAt !== "" ? new Date(this.createdAt) : new Date(),
        id: this.id,
        passphrase: this.passphrase,
        slug: this.slug,
        status: "draft",
        title: this.title || "無題"
      }
    });
    this.published = true;
    this.reset();
  }

  public reset(): void {
    this.id = "";
    this.body = "";
    this.categories = [];
    this.createdAt = "";
    this.passphrase = "";
    this.slug = "";
    this.title = "";
  }

  public beforeRouteLeave(to: any, from: any, next: any): void {
    const isEdited = this.entry ? this.entry.body !== this.body : this.body !== "";
    if (isEdited) {
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
