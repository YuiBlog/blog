<template lang="pug">
  div(v-html="asHtmlDocument")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Marked from "marked";
import Prism from "prismjs";

// languages
import "prismjs/components/prism-bash";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-diff";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-nginx";
import "prismjs/components/prism-perl";
import "prismjs/components/prism-pug";
import "prismjs/components/prism-python";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";

@Component
export default class MarkdownPreviewer extends Vue {
  @Prop({ required: true })
  public markdown!: string;

  private renderer: Marked.Renderer;

  public constructor() {
    super();
    this.renderer = new Marked.Renderer();
    this.renderer.code = (code, lang, escaped) => {
      let filename = "";
      if (lang && lang.indexOf(":") > 0) {
        [lang, filename] = lang.split(":");
      }

      if (lang && Prism.languages[lang]) {
        return (
          `<pre class="language-${lang}" ${filename ? `data-lang="${filename}"` : ""}>` +
          `<code class="language-${lang}">` +
          Prism.highlight(code, Prism.languages[lang]) +
          `</code>` +
          `</pre>`
        );
      } else {
        return `<pre class="language-plain"><code class="language-plain">${code}</pre></code>`;
      }
    };
    this.renderer.codespan = code => `<code class="font-mono rounded bg-black text-white p-1">${code}</code>`;
    this.renderer.listitem = text => `<li class="leading-normal">${text}</li>\n`;
    this.renderer.paragraph = text => `<p class="my-4 leading-normal">${text}</p>\n`;

    Marked.setOptions({
      gfm: true
    });
  }

  public get asHtmlDocument(): string {
    return Marked.parse(this.markdown.replace(/\\n/g, "\n"), { renderer: this.renderer });
  }
}
</script>

<style lang="scss" scoped>
div {
  overflow-wrap: break-word;
}

/deep/ pre[class*="language-"] {
  border-radius: 0;

  &[data-lang] {
    position: relative;
    padding: 2em 1em 1em 1em;

    &::before {
      background: #dae1e7;
      color: #606f7b;
      content: attr(data-lang);
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      padding: 2px 4px;

      // reset
      text-shadow: none;
    }
  }
}
</style>
