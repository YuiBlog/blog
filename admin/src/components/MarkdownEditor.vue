<template lang="pug">
  monaco-editor.editor(ref="monaco" v-model="markdown" theme="vs-dark" language="markdown")
</template>

<script lang="ts">
import { editor } from "monaco-editor";
import MonacoEditor from "vue-monaco";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ components: { MonacoEditor } })
export default class MarkdownEditor extends Vue {
  public editor!: editor.IStandaloneCodeEditor;

  @Prop({ required: true })
  public value!: string;

  public get markdown() {
    return this.value;
  }

  public set markdown(value: string) {
    if (this.value !== value) {
      this.$emit("input", value);
    }
  }

  public mounted(): void {
    this.$nextTick(() => {
      this.editor = (this.$refs.monaco as any).getMonaco();
    });

    window.addEventListener("resize", this.updateLayout);
  }

  public destroyed(): void {
    window.removeEventListener("resize", this.updateLayout);
  }

  private updateLayout() {
    this.editor.layout();
  }
}
</script>

<style lang="postcss" scoped>
.editor {
  @apply h-full max-h-full;
  @apply w-full max-w-full;
}
</style>
