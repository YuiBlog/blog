<template lang="pug">
  div
    header-navigation
    .flex
      .hidden.flex-no-shrink(class="md:block")
        side-navigation
      .overflow-hidden.w-full.max-w-full.pt-16
        slot
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import HeaderNavigation from "@/components/navigations/HeaderNavigation.vue";
import SideNavigation from "@/components/navigations/SideNavigation.vue";

@Component({
  components: {
    HeaderNavigation,
    SideNavigation
  }
})
export default class Navigation extends Vue {}
</script>
