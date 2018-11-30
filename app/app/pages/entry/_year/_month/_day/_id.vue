<template lang="pug">
  .pt-5.pb-10
    nuxt-link.inline.bg-orange.text-white.no-underline(class="hover:underline" to="/archive/2018/11/24")
      small.text-xs.m-2 date
    h2.py-2 title

    div(v-html="asHtmlDocument")
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import Marked from "marked";
import Prism from "prismjs";

// 使ってそうなものだけ入れておく
import "prismjs/components/prism-bash";
import "prismjs/components/prism-csharp";
// import "prismjs/components/prism-cpp";
import "prismjs/components/prism-diff";
import "prismjs/components/prism-json";
import "prismjs/components/prism-nginx";
import "prismjs/components/prism-perl";
import "prismjs/components/prism-pug";
import "prismjs/components/prism-python";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-vim";
import "prismjs/components/prism-yaml";

import "prismjs/themes/prism-okaidia.css";

@Component
export default class extends Vue {
  public get asHtmlDocument(): string {
    // customize for tailwindcss.
    const renderer = new Marked.Renderer();
    renderer.codespan = code => `<code class="font-mono rounded bg-black text-white p-1">${code}</code>`;
    renderer.listitem = text => `<li class="leading-normal">${text}</li>\n`;
    renderer.paragraph = text => `<p class="my-4 leading-normal">${text}</p>\n`;

    Marked.setOptions({
      gfm: true,
      highlight: (code, lang) => {
        if (Prism.languages[lang]) {
          return Prism.highlight(code, Prism.languages[lang]);
        }
        return code;
      }
    });

    return Marked.parse("", { renderer });
  }
}
</script>
