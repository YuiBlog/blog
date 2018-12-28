<template lang="pug">
  .min-h-screen.flex.flex-col.items-center.justify-center
    p ログアウトしています...
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component
export default class Logout extends Vue {
  // prettier-ignore
  @Action("session/logout")
  public logout!: () => Promise<void>;

  public async mounted(): Promise<void> {
    await this.logout();
    location.href = "/"; // redirect to root (not admin) location
  }
}
</script>
