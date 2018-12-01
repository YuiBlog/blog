<template lang="pug">
  div
    profile
    entry
    archive
    category
    happy-busy
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import Archive from "components/blogparts/Archive.vue";
import Category from "components/blogparts/Category.vue";
import Entry from "components/blogparts/Entry.vue";
import HappyBusy from "components/blogparts/HappyBusy.vue";
import Profile from "components/blogparts/Profile.vue";

@Component({
  components: {
    Archive,
    Category,
    Entry,
    HappyBusy,
    Profile
  }
})
export default class extends Vue {}
</script>

