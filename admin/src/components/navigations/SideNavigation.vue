<template lang="pug">
  nav.relative.min-h-screen.h-full.pt-16.border-r.border-grey-darker.bg-grey-darkest
    ul.list-reset
      li.h-12(v-for="content in contents" :key="content.href" class="hover:bg-grey-darker")
        router-link.block.h-12.px-8.py-4.text-grey-light(:to="content.href" class="hover:no-underline")
          i.fa-fw.mr-2(:class="content.icon")
          | {{content.text}}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SideNavigation extends Vue {
  public contents = [
    { icon: "fas fa-tachometer-alt", href: "/", text: "ダッシュボード" },
    { icon: "fas fa-pencil-alt", href: "/edit", text: "記事を書く" },
    { icon: "far fa-newspaper", href: "/entries", text: "記事の管理" },
    { icon: "fas fa-tags", href: "/categories", text: "カテゴリー" },
    { icon: "far fa-images", href: "/media", text: "メディア" },
    { icon: "fas fa-cog", href: "/settings", text: "ブログ設定" },
    { icon: "fas fa-sign-out-alt", href: "/logout", text: "ログアウト" }
  ];
}
</script>

<style lang="postcss" scoped>
.router-link-exact-active {
  @apply bg-black;
}
</style>
