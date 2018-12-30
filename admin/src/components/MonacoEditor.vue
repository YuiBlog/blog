<template lang="pug">
  div(ref="editor")
</template>

<script lang="ts">
import * as monaco from "monaco-editor";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MonacoEditor extends Vue {
  @Prop()
  public value!: string;

  @Prop()
  public theme: string = "vs-dark";

  @Prop()
  public language!: string;

  @Prop()
  public options!: any;

  private editor!: monaco.editor.IStandaloneCodeEditor;

  public mounted(): void {
    this.editor = monaco.editor.create(
      this.$refs.editor as HTMLElement,
      Object.assign(
        {
          language: this.language,
          theme: this.theme,
          value: this.value
        },
        this.options
      )
    );
    this.editor.onDidChangeModelContent(event => {
      const value = this.editor.getValue();
      if (this.value !== value) {
        this.$emit("input", value);
      }
    });
  }

  public beforeDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
    }
  }

  public getMonaco(): monaco.editor.IStandaloneCodeEditor {
    return this.editor;
  }
}
</script>
