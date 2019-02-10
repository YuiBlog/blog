<template lang="pug">
  div
    .bg-grey-light.p-2.my-2
      h4 合言葉
    .pl-2
      small.text-grey-dark.text-sm
        | 合言葉を設定した記事は、合言葉を入力し、一致した場合のみ閲覧可能な記事になります。
      
      .py-2
        input.w-full.py-2.px-1(v-model.trim="passphrase")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class EditorPassphrase extends Vue {
  @Prop({ required: true })
  public value!: string;
  public model: string = "";

  public get passphrase(): string {
    return this.model;
  }

  public set passphrase(value: string) {
    this.model = value;
    if (this.value === value) {
      return;
    }
    this.$emit("input", value);
  }
}
</script>
