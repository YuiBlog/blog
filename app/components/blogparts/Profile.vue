<template lang="pug">
  blog-parts(title="プロフィール")
    .py-2
      avatar.w-16.h-16(src="https://static.mochizuki.moe/anna.png")

    p.text-sm.leading-normal {{settings.user.name}}
    p.my-2.text-sm.leading-normal
      | {{settings.user.bio}}
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Getter } from "vuex-class";

import Avatar from "components/presentationals/Avatar.vue";
import BlogParts from "components/presentationals/BlogParts.vue";
import { Settings } from "models/types";

@Component({
  components: {
    Avatar,
    BlogParts
  }
})
export default class Profile extends Vue {
  @Getter("settings")
  public settings!: Settings;
}</script>
