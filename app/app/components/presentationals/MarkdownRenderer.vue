<template lang="pug">
  div(v-html="asHtmlDocument")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import Marked from "marked";
import Prism from "prismjs";

// languages
import "prismjs/components/prism-bash";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-diff";
import "prismjs/components/prism-json";
import "prismjs/components/prism-nginx";
import "prismjs/components/prism-perl";
import "prismjs/components/prism-pug";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-vim";
import "prismjs/components/prism-yaml";

// theme
import "prismjs/themes/prism-okaidia.css";

@Component
export default class extends Vue {
  private renderer: Marked.Renderer;

  public constructor() {
    super();
    this.renderer = new Marked.Renderer();
    this.renderer.codespan = code => `<code class="font-mono rounded bg-black text-white p-1">${code}</code>`;
    this.renderer.listitem = text => `<li class="leading-normal">${text}</li>\n`;
    this.renderer.paragraph = text => `<p class="my-4 leading-normal">${text}</p>\n`;

    Marked.setOptions({
      gfm: true,
      highlight: (code, lang) => {
        return Prism.languages[lang]
          ? Prism.highlight(code, Prism.languages[lang])
          : `<pre class="language-plain"><code class="language-plain">${code}</code></pre>`;
      }
    });
  }

  @Prop({ required: true })
  public markdown!: string;

  public get asHtmlDocument(): string {
    return Marked.parse(this.markdown.replace(/\\n/g, "\n"), { renderer: this.renderer });
  }
}
</script>
