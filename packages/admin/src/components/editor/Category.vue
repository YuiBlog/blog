<template lang="pug">
  .pl-2
    h3.mb-2 カテゴリー
    small.text-grey-dark.text-sm
      | カテゴリーを入力して Enter で確定するか、カテゴリーリストから選んでクリックで追加します。
    vue-tags-input.w-full.py-2(v-model="category" :tags="categories" @tags-changed="tags => categories = tags" placeholder="タグを追加...")
</template>

<script lang="ts">
import VueTagsInput from "@johmun/vue-tags-input";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ components: { VueTagsInput } })
export default class CategoryEditor extends Vue {
  @Prop()
  public value!: string[];

  public category: string = "";

  public get categories() {
    return this.value.map(w => {
      return { text: w };
    });
  }

  public set categories(value: any[]) {
    this.$emit("input", value.map(w => w.text));
  }
}
</script>
