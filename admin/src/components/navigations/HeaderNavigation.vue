<template lang="pug">
  header.pin-t.pin-x.fixed.z-50.border-b.border-grey-darker.bg-grey-darkest
    ul.list-reset.h-16.px-6.flex.items-center.content-center
      li.flex-auto
        router-link(to="/") Yui 管理コンソール
      li.flex.justify-end
        .hidden(class="md:block")
          router-link(to="/edit")
            | 記事を書く
          router-link(to="/logout")
            | ログアウト
        div(class="md:hidden")
          button.text-grey-light(class="hover:no-underline")
            i.fas.fa-bars.fa-lg
</template>

<style lang="postcss" scoped>
a {
  @apply px-2;
  @apply text-grey-light;
}
</style>
