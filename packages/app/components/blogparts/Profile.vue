<template lang="pug">
  blog-parts(title="プロフィール")
    .py-2
      avatar.w-16.h-16(:src="settings.user.icon")

    p.text-sm.leading-normal {{settings.user.name}}
    p.my-2.text-sm.leading-normal
      | {{settings.user.bio}}
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Getter } from "vuex-class";
import { Settings } from "@yuiblog/types";

import Avatar from "components/presentationals/Avatar.vue";
import BlogParts from "components/presentationals/BlogParts.vue";

@Component({
  components: {
    Avatar,
    BlogParts
  }
})
export default class Profile extends Vue {
  @Getter("settings")
  public settings!: Settings;
}
</script>
