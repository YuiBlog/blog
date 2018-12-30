<template lang="pug">
  .relative.pin-x.pin-b.bg-grey-darkest
    .py-5
      p.text-white.text-center
        small
          nuxt-link.text-white(to="/") {{settings.blog.name}}
          br
          | Powered by 
          a.text-white(href="https://github.com/YuiBlog" target="_blank") Yui
          | .
          | The source code is licensed 
          a.text-white(href="http://opensource.org/licenses/mit-license.php" target="_blank") MIT
          | .
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Getter } from "vuex-class";
import { Settings } from "models/types";

@Component
export default class BlogFooter extends Vue {
  @Getter("settings")
  public settings!: Settings;
}
</script>
