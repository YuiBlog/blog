<template lang="pug">
  .pt-5.pb-10
    .py-5
      nuxt-link.text-black(to="/")
        h1 {{settings.blog.name}}
    
    small.text-grey-darker
      | {{settings.blog.description}}
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Getter } from "vuex-class";
import { Settings } from "@yuiblog/types";

@Component
export default class BlogTitle extends Vue {
  @Getter("settings")
  public settings!: Settings;
}
</script>
