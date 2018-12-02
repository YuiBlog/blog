<template lang="pug">
  div
    profile
    entry
    archive
    category
    happy-busy
    admin
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import Admin from "components/blogparts/Admin.vue";
import Archive from "components/blogparts/Archive.vue";
import Category from "components/blogparts/Category.vue";
import Entry from "components/blogparts/Entry.vue";
import HappyBusy from "components/blogparts/HappyBusy.vue";
import Profile from "components/blogparts/Profile.vue";

@Component({
  components: {
    Admin,
    Archive,
    Category,
    Entry,
    HappyBusy,
    Profile
  }
})
export default class extends Vue {}
</script>

