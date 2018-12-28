<template lang="pug">
  .min-h-screen.flex.flex-col.items-center.justify-center
    p 読み込み中...
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class Login extends Vue {
  // prettier-ignore
  @Action("session/login")
  public login!: () => Promise<void>;

  // prettier-ignore
  @Getter("session/state")
  public state!: "enabled" | "disabled";

  public async mounted(): Promise<void> {
    await this.login();
    if (this.state === "enabled") {
      this.$router.push({ path: "/" });
    }
  }
}
</script>
